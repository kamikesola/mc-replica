import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Java 参照实现 + 对拍数据生成器。
 *
 * 用法（在仓库根目录）：
 *   javac -d tools/parity/out tools/parity/Parity.java
 *   java -cp tools/parity/out Parity > tests/fixtures/parity.json
 *
 * 这里的类是按 1.21.1 的世界生成代码用原生 long/double/float 重写的，
 * 作用是检查 TS 版本里 bigint / Math.fround / 无符号移位这些“容易写错的算术”。
 * LegacyRandomSource 额外和 java.util.Random 逐个比较（两者算法相同，这是真正的外部基准）；
 * MD5 用 JDK 的 MessageDigest 作为基准。
 */
public class Parity {

  // ---------------------------------------------------------------- random

  interface RandomSource {
    int nextInt();
    int nextInt(int bound);
    long nextLong();
    double nextDouble();
    float nextFloat();
    boolean nextBoolean();
    void consumeCount(int n);
    PositionalRandomFactory forkPositional();
  }

  interface PositionalRandomFactory {
    RandomSource at(int x, int y, int z);
    RandomSource fromHashOf(String name);
  }

  static long getSeed(int x, int y, int z) {
    long l = (long) (x * 3129871) ^ (long) z * 116129781L ^ (long) y;
    l = l * l * 42317861L + l * 11L;
    return l >> 16;
  }

  static final class Legacy implements RandomSource {
    long seed;
    Legacy(long s) { seed = (s ^ 25214903917L) & 281474976710655L; }
    int next(int bits) {
      seed = seed * 25214903917L + 11L & 281474976710655L;
      return (int) (seed >> 48 - bits);
    }
    public int nextInt() { return next(32); }
    public int nextInt(int bound) {
      if ((bound & bound - 1) == 0) return (int) ((long) bound * (long) next(31) >> 31);
      int i, j;
      do { i = next(31); j = i % bound; } while (i - j + (bound - 1) < 0);
      return j;
    }
    public long nextLong() { int i = next(32); int j = next(32); return ((long) i << 32) + (long) j; }
    public double nextDouble() { int i = next(26); int j = next(27); long l = ((long) i << 27) + (long) j; return (double) l * (double) 1.110223E-16F; }
    public float nextFloat() { return (float) next(24) * 5.9604645E-8F; }
    public boolean nextBoolean() { return next(1) != 0; }
    public void consumeCount(int n) { for (int i = 0; i < n; i++) nextInt(); }
    public PositionalRandomFactory forkPositional() {
      long s = nextLong();
      return new PositionalRandomFactory() {
        public RandomSource at(int x, int y, int z) { return new Legacy(getSeed(x, y, z) ^ s); }
        public RandomSource fromHashOf(String name) { return new Legacy((long) name.hashCode() ^ s); }
      };
    }
  }

  static long mixStafford13(long z) {
    z = (z ^ z >>> 30) * -4658895280553007687L;
    z = (z ^ z >>> 27) * -7723592293110705685L;
    return z ^ z >>> 31;
  }

  static long[] upgrade(long seed) {
    long lo = seed ^ 7640891576956012809L;
    long hi = lo + -7046029254386353131L;
    return new long[] {mixStafford13(lo), mixStafford13(hi)};
  }

  static long[] seedFromHashOf(String s) {
    try {
      byte[] b = MessageDigest.getInstance("MD5").digest(s.getBytes(StandardCharsets.UTF_8));
      long lo = 0, hi = 0;
      for (int i = 0; i < 8; i++) lo = lo << 8 | (b[i] & 0xFFL);
      for (int i = 8; i < 16; i++) hi = hi << 8 | (b[i] & 0xFFL);
      return new long[] {lo, hi};
    } catch (Exception e) { throw new RuntimeException(e); }
  }

  static final class Xoroshiro implements RandomSource {
    long lo, hi;
    Xoroshiro(long seed) { long[] s = upgrade(seed); init(s[0], s[1]); }
    Xoroshiro(long l, long h) { init(l, h); }
    void init(long l, long h) {
      lo = l; hi = h;
      if ((lo | hi) == 0L) { lo = -7046029254386353131L; hi = 7640891576956012809L; }
    }
    long rawNext() {
      long l = lo, m = hi;
      long n = Long.rotateLeft(l + m, 17) + l;
      m ^= l;
      lo = Long.rotateLeft(l, 49) ^ m ^ m << 21;
      hi = Long.rotateLeft(m, 28);
      return n;
    }
    long nextBits(int bits) { return rawNext() >>> 64 - bits; }
    public int nextInt() { return (int) rawNext(); }
    public int nextInt(int bound) {
      long l = Integer.toUnsignedLong(nextInt());
      long m = l * (long) bound;
      long n = m & 4294967295L;
      if (n < (long) bound) {
        int i = Integer.remainderUnsigned(~bound + 1, bound);
        while (n < (long) i) { l = Integer.toUnsignedLong(nextInt()); m = l * (long) bound; n = m & 4294967295L; }
      }
      return (int) (m >> 32);
    }
    public long nextLong() { return rawNext(); }
    public double nextDouble() { return (double) nextBits(53) * (double) 1.110223E-16F; }
    public float nextFloat() { return (float) nextBits(24) * 5.9604645E-8F; }
    public boolean nextBoolean() { return (rawNext() & 1L) != 0L; }
    public void consumeCount(int n) { for (int i = 0; i < n; i++) rawNext(); }
    public PositionalRandomFactory forkPositional() {
      long sl = rawNext(), sh = rawNext();
      return new PositionalRandomFactory() {
        public RandomSource at(int x, int y, int z) { return new Xoroshiro(getSeed(x, y, z) ^ sl, sh); }
        public RandomSource fromHashOf(String name) { long[] s = seedFromHashOf(name); return new Xoroshiro(s[0] ^ sl, s[1] ^ sh); }
      };
    }
  }

  // ---------------------------------------------------------------- noise

  static final int[][] GRADIENT = {
    {1, 1, 0}, {-1, 1, 0}, {1, -1, 0}, {-1, -1, 0}, {1, 0, 1}, {-1, 0, 1}, {1, 0, -1}, {-1, 0, -1},
    {0, 1, 1}, {0, -1, 1}, {0, 1, -1}, {0, -1, -1}, {1, 1, 0}, {0, -1, 1}, {-1, 1, 0}, {0, -1, -1}
  };

  static int floor(double d) { int i = (int) d; return d < (double) i ? i - 1 : i; }
  static long lfloor(double d) { long l = (long) d; return d < (double) l ? l - 1L : l; }
  static double smoothstep(double d) { return d * d * d * (d * (d * 6.0 - 15.0) + 10.0); }
  static double lerp(double t, double a, double b) { return a + t * (b - a); }
  static double lerp2(double dx, double dy, double a, double b, double c, double d) { return lerp(dy, lerp(dx, a, b), lerp(dx, c, d)); }
  static double lerp3(double dx, double dy, double dz, double a, double b, double c, double d, double e, double f, double g, double h) {
    return lerp(dz, lerp2(dx, dy, a, b, c, d), lerp2(dx, dy, e, f, g, h));
  }
  static double clampedLerp(double s, double e, double t) { return t < 0.0 ? s : (t > 1.0 ? e : lerp(t, s, e)); }

  static final class ImprovedNoise {
    final byte[] p = new byte[256];
    final double xo, yo, zo;
    ImprovedNoise(RandomSource r) {
      xo = r.nextDouble() * 256.0; yo = r.nextDouble() * 256.0; zo = r.nextDouble() * 256.0;
      for (int i = 0; i < 256; i++) p[i] = (byte) i;
      for (int i = 0; i < 256; i++) { int j = r.nextInt(256 - i); byte b = p[i]; p[i] = p[i + j]; p[i + j] = b; }
    }
    int P(int i) { return p[i & 0xFF] & 0xFF; }
    static double gradDot(int g, double x, double y, double z) { int[] v = GRADIENT[g & 15]; return v[0] * x + v[1] * y + v[2] * z; }
    double noise(double x, double y, double z, double yScale, double yMax) {
      double d = x + xo, e = y + yo, f = z + zo;
      int i = floor(d), j = floor(e), k = floor(f);
      double g = d - i, h = e - j, l = f - k;
      double o;
      if (yScale != 0.0) { double m = yMax >= 0.0 && yMax < h ? yMax : h; o = floor(m / yScale + 1.0E-7F) * yScale; } else o = 0.0;
      return sample(i, j, k, g, h - o, l, h);
    }
    double sample(int gx, int gy, int gz, double dx, double wy, double dz, double dy) {
      int i = P(gx), j = P(gx + 1), k = P(i + gy), l = P(i + gy + 1), m = P(j + gy), n = P(j + gy + 1);
      double a = gradDot(P(k + gz), dx, wy, dz);
      double b = gradDot(P(m + gz), dx - 1.0, wy, dz);
      double c = gradDot(P(l + gz), dx, wy - 1.0, dz);
      double d = gradDot(P(n + gz), dx - 1.0, wy - 1.0, dz);
      double e = gradDot(P(k + gz + 1), dx, wy, dz - 1.0);
      double f = gradDot(P(m + gz + 1), dx - 1.0, wy, dz - 1.0);
      double g = gradDot(P(l + gz + 1), dx, wy - 1.0, dz - 1.0);
      double h = gradDot(P(n + gz + 1), dx - 1.0, wy - 1.0, dz - 1.0);
      return lerp3(smoothstep(dx), smoothstep(dy), smoothstep(dz), a, b, c, d, e, f, g, h);
    }
  }

  static double wrap(double v) { return v - (double) lfloor(v / 3.3554432E7 + 0.5) * 3.3554432E7; }

  static final class PerlinNoise {
    final ImprovedNoise[] levels;
    final double[] amps;
    final double inF, valF, maxValue;
    PerlinNoise(RandomSource r, int first, double[] a, boolean newFactory) {
      amps = a;
      int i = a.length, j = -first;
      levels = new ImprovedNoise[i];
      if (newFactory) {
        PositionalRandomFactory f = r.forkPositional();
        for (int k = 0; k < i; k++) if (a[k] != 0.0) levels[k] = new ImprovedNoise(f.fromHashOf("octave_" + (first + k)));
      } else {
        ImprovedNoise n = new ImprovedNoise(r);
        if (j >= 0 && j < i && a[j] != 0.0) levels[j] = n;
        for (int k = j - 1; k >= 0; k--) {
          if (k < i) { if (a[k] != 0.0) levels[k] = new ImprovedNoise(r); else r.consumeCount(262); }
          else r.consumeCount(262);
        }
      }
      inF = Math.pow(2.0, -j);
      valF = Math.pow(2.0, i - 1) / (Math.pow(2.0, i) - 1.0);
      maxValue = edge(2.0);
    }
    double edge(double mul) { double d = 0, e = valF; for (int i = 0; i < levels.length; i++) { if (levels[i] != null) d += amps[i] * mul * e; e /= 2.0; } return d; }
    double getValue(double x, double y, double z) {
      double d = 0, e = inF, f = valF;
      for (int i = 0; i < levels.length; i++) {
        ImprovedNoise n = levels[i];
        if (n != null) d += amps[i] * n.noise(wrap(x * e), wrap(y * e), wrap(z * e), 0.0, 0.0) * f;
        e *= 2.0; f /= 2.0;
      }
      return d;
    }
    ImprovedNoise octave(int i) { return levels[levels.length - 1 - i]; }
  }

  static PerlinNoise legacyBlended(RandomSource r, int lo) {
    double[] a = new double[-lo + 1];
    java.util.Arrays.fill(a, 1.0);
    return new PerlinNoise(r, lo, a, false);
  }

  static final class NormalNoise {
    final PerlinNoise first, second;
    final double valueFactor, maxValue;
    NormalNoise(RandomSource r, int firstOctave, double[] amps) {
      first = new PerlinNoise(r, firstOctave, amps, true);
      second = new PerlinNoise(r, firstOctave, amps, true);
      int j = Integer.MAX_VALUE, k = Integer.MIN_VALUE;
      for (int l = 0; l < amps.length; l++) if (amps[l] != 0.0) { j = Math.min(j, l); k = Math.max(k, l); }
      valueFactor = 0.16666666666666666 / (0.1 * (1.0 + 1.0 / (double) (k - j + 1)));
      maxValue = (first.maxValue + second.maxValue) * valueFactor;
    }
    double getValue(double x, double y, double z) {
      return (first.getValue(x, y, z) + second.getValue(x * 1.0181268882175227, y * 1.0181268882175227, z * 1.0181268882175227)) * valueFactor;
    }
  }

  static final class Blended {
    final PerlinNoise minN, maxN, mainN;
    final double xzMul, yMul, xzF, yF, smear;
    Blended(RandomSource r, double xzScale, double yScale, double xzFactor, double yFactor, double smearMul) {
      minN = legacyBlended(r, -15); maxN = legacyBlended(r, -15); mainN = legacyBlended(r, -7);
      xzMul = 684.412 * xzScale; yMul = 684.412 * yScale; xzF = xzFactor; yF = yFactor; smear = smearMul;
    }
    double compute(int bx, int by, int bz) {
      double d = bx * xzMul, e = by * yMul, f = bz * xzMul;
      double g = d / xzF, h = e / yF, i = f / xzF;
      double j = yMul * smear, k = j / yF;
      double l = 0, m = 0, n = 0, o = 1.0;
      for (int p = 0; p < 8; p++) { ImprovedNoise q = mainN.octave(p); if (q != null) n += q.noise(wrap(g * o), wrap(h * o), wrap(i * o), k * o, h * o) / o; o /= 2.0; }
      double q = (n / 10.0 + 1.0) / 2.0;
      boolean b2 = q >= 1.0, b3 = q <= 0.0;
      o = 1.0;
      for (int r = 0; r < 16; r++) {
        double s = wrap(d * o), t = wrap(e * o), u = wrap(f * o), v = j * o;
        if (!b2) { ImprovedNoise w = minN.octave(r); if (w != null) l += w.noise(s, t, u, v, e * o) / o; }
        if (!b3) { ImprovedNoise w = maxN.octave(r); if (w != null) m += w.noise(s, t, u, v, e * o) / o; }
        o /= 2.0;
      }
      return clampedLerp(l / 512.0, m / 512.0, q) / 128.0;
    }
  }


  // ---------------------------------------------------------------- simplex / end islands

  static final class Simplex {
    final int[] p = new int[512];
    final double xo, yo, zo;
    static final double SQRT_3 = Math.sqrt(3.0), F2 = 0.5 * (SQRT_3 - 1.0), G2 = (3.0 - SQRT_3) / 6.0;
    Simplex(RandomSource r) {
      xo = r.nextDouble() * 256.0; yo = r.nextDouble() * 256.0; zo = r.nextDouble() * 256.0;
      for (int i = 0; i < 256; i++) p[i] = i;
      for (int i = 0; i < 256; i++) { int j = r.nextInt(256 - i); int k = p[i]; p[i] = p[j + i]; p[j + i] = k; }
    }
    int P(int i) { return p[i & 0xFF]; }
    double corner(int g, double x, double y, double z, double off) {
      double d = off - x * x - y * y - z * z;
      if (d < 0.0) return 0.0;
      d *= d;
      int[] v = GRADIENT[g];
      return d * d * (v[0] * x + v[1] * y + v[2] * z);
    }
    double getValue(double x, double y) {
      double d = (x + y) * F2;
      int i = floor(x + d), j = floor(y + d);
      double e = (double) (i + j) * G2;
      double f = (double) i - e, g = (double) j - e;
      double h = x - f, k = y - g;
      int l, m;
      if (h > k) { l = 1; m = 0; } else { l = 0; m = 1; }
      double n = h - (double) l + G2, o = k - (double) m + G2;
      double pp = h - 1.0 + 2.0 * G2, q = k - 1.0 + 2.0 * G2;
      int r = i & 0xFF, s = j & 0xFF;
      int t = P(r + P(s)) % 12, u = P(r + l + P(s + m)) % 12, v = P(r + 1 + P(s + 1)) % 12;
      return 70.0 * (corner(t, h, k, 0.0, 0.5) + corner(u, n, o, 0.0, 0.5) + corner(v, pp, q, 0.0, 0.5));
    }
  }

  static float clampF(float v, float lo, float hi) { return v < lo ? lo : Math.min(v, hi); }

  static float endHeight(Simplex noise, int x, int z) {
    int i = x / 2, j = z / 2, k = x % 2, l = z % 2;
    float f = 100.0F - (float) Math.sqrt((float) (x * x + z * z)) * 8.0F;
    f = clampF(f, -100.0F, 80.0F);
    for (int m = -12; m <= 12; m++) for (int n = -12; n <= 12; n++) {
      long o = (long) (i + m), pp = (long) (j + n);
      if (o * o + pp * pp > 4096L && noise.getValue((double) o, (double) pp) < -0.9F) {
        float g = (Math.abs((float) o) * 3439.0F + Math.abs((float) pp) * 147.0F) % 13.0F + 9.0F;
        float h = (float) (k - m * 2), q = (float) (l - n * 2);
        float r = 100.0F - (float) Math.sqrt(h * h + q * q) * g;
        r = clampF(r, -100.0F, 80.0F);
        f = Math.max(f, r);
      }
    }
    return f;
  }

  // ---------------------------------------------------------------- spline (float)

  static float lerpF(float t, float a, float b) { return a + t * (b - a); }

  /** 单层样条，值为常数；够检验 float 舍入 */
  static float spline(float f, float[] loc, float[] val, float[] der) {
    int lo = 0, len = loc.length;
    { int min = 0, i = len; while (i > 0) { int j = i / 2, k = min + j; if (f < loc[k]) i = j; else { min = k + 1; i -= j + 1; } } lo = min - 1; }
    int last = len - 1;
    if (lo < 0) return der[0] == 0.0F ? val[0] : val[0] + der[0] * (f - loc[0]);
    if (lo == last) return der[last] == 0.0F ? val[last] : val[last] + der[last] * (f - loc[last]);
    float g = loc[lo], h = loc[lo + 1];
    float k = (f - g) / (h - g);
    float n = val[lo], o = val[lo + 1], l = der[lo], m = der[lo + 1];
    float p = l * (h - g) - (o - n);
    float q = -m * (h - g) + (o - n);
    return lerpF(k, n, o) + k * (1.0F - k) * lerpF(k, p, q);
  }

  // ---------------------------------------------------------------- output

  // ---------------------------------------------------------------- v4：生物群系
  /** BiomeManager.obfuscateSeed：Guava Hashing.sha256().hashLong(seed).asLong()（小端写入，小端读出前 8 字节） */
  static long obfuscateSeed(long seed) throws Exception {
    java.security.MessageDigest md = java.security.MessageDigest.getInstance("SHA-256");
    byte[] h = md.digest(java.nio.ByteBuffer.allocate(8).order(java.nio.ByteOrder.LITTLE_ENDIAN).putLong(seed).array());
    return java.nio.ByteBuffer.wrap(h, 0, 8).order(java.nio.ByteOrder.LITTLE_ENDIAN).getLong();
  }
  static long lcgNext(long a, long b) { a *= a * 6364136223846793005L + 1442695040888963407L; return a + b; }
  static double getFiddle(long l) { double d = (double) Math.floorMod(l >> 24, 1024) / 1024.0; return (d - 0.5) * 0.9; }
  static double fiddledDistance(long l, int i, int j, int k, double d, double e, double f) {
    long m = lcgNext(l, i); m = lcgNext(m, j); m = lcgNext(m, k); m = lcgNext(m, i); m = lcgNext(m, j); m = lcgNext(m, k);
    double g = getFiddle(m); m = lcgNext(m, l); double h = getFiddle(m); m = lcgNext(m, l); double n = getFiddle(m);
    return (f + n) * (f + n) + (e + h) * (e + h) + (d + g) * (d + g);
  }
  /** BiomeManager.getBiome 选中的 quart 坐标 */
  static int[] zoom(long seed, int x, int y, int z) {
    int i = x - 2, j = y - 2, k = z - 2, l = i >> 2, m = j >> 2, n = k >> 2;
    double d = (double) (i & 3) / 4.0, e = (double) (j & 3) / 4.0, f = (double) (k & 3) / 4.0;
    int o = 0; double g = Double.POSITIVE_INFINITY;
    for (int p = 0; p < 8; ++p) {
      boolean b1 = (p & 4) == 0, b2 = (p & 2) == 0, b3 = (p & 1) == 0;
      double v = fiddledDistance(seed, b1 ? l : l + 1, b2 ? m : m + 1, b3 ? n : n + 1, b1 ? d : d - 1.0, b2 ? e : e - 1.0, b3 ? f : f - 1.0);
      if (g > v) { o = p; g = v; }
    }
    return new int[]{(o & 4) == 0 ? l : l + 1, (o & 2) == 0 ? m : m + 1, (o & 1) == 0 ? n : n + 1};
  }
  /** PerlinSimplexNoise（只实现最高倍频为 0 的情况） */
  static final class PerlinSimplex {
    final Simplex[] levels; final double inF, valF;
    PerlinSimplex(RandomSource r, int[] octaves) {
      java.util.TreeSet<Integer> set = new java.util.TreeSet<>(); for (int o : octaves) set.add(o);
      int i = -set.first(), j = set.last(), k = i + j + 1;
      Simplex first = new Simplex(r);
      int l = j; levels = new Simplex[k];
      if (l >= 0 && l < k && set.contains(0)) levels[l] = first;
      for (int m = l + 1; m < k; ++m) { if (m >= 0 && set.contains(l - m)) levels[m] = new Simplex(r); else r.consumeCount(262); }
      inF = Math.pow(2.0, j); valF = 1.0 / (Math.pow(2.0, k) - 1.0);
    }
    double getValue(double x, double z) {
      double d = 0, e = inF, f = valF;
      for (Simplex s : levels) { if (s != null) d += s.getValue(x * e, z * e) * f; e /= 2.0; f *= 2.0; }
      return d;
    }
  }
  static long quantize(float f) { return (long) (f * 10000.0F); }

  static final StringBuilder out = new StringBuilder();
  static boolean firstEntry = true;

  static void key(String k) { out.append(firstEntry ? "\n  " : ",\n  ").append('"').append(k).append("\": "); firstEntry = false; }
  static String d(double v) { return "\"" + Double.doubleToRawLongBits(v) + "\""; }
  static String L(long v) { return "\"" + v + "\""; }
  static String list(List<String> xs) { return "[" + String.join(",", xs) + "]"; }

  static final long[] SEEDS = {0L, 1L, -1L, 42L, 123456789012345L, Long.MIN_VALUE, Long.MAX_VALUE, -4172144997902289642L};
  static final double[][] POINTS = {{0, 0, 0}, {0.5, 1.25, -3.75}, {100.3, -64, 2048.9}, {-12345.678, 70.1, 98765.4321}, {1e7, 3, -1e7}, {3e7, 0, 3e7}};

  static List<String> seq(RandomSource r) {
    List<String> xs = new ArrayList<>();
    for (int i = 0; i < 4; i++) xs.add(String.valueOf(r.nextInt()));
    for (int b : new int[] {1, 2, 7, 100, 256, 1000, 1 << 20, Integer.MAX_VALUE}) xs.add(String.valueOf(r.nextInt(b)));
    for (int i = 0; i < 3; i++) xs.add(L(r.nextLong()));
    for (int i = 0; i < 3; i++) xs.add(d(r.nextDouble()));
    for (int i = 0; i < 3; i++) xs.add(d(r.nextFloat()));
    r.consumeCount(5);
    xs.add(L(r.nextLong()));
    return xs;
  }

  public static void main(String[] args) {
    // 1) LegacyRandomSource 必须与 java.util.Random 完全一致
    for (long s : SEEDS) {
      Legacy a = new Legacy(s);
      Random b = new Random(s);
      for (int i = 0; i < 1000; i++) {
        int bound = 1 + (i * 7919) % 5000;
        if (a.nextInt() != b.nextInt() || a.nextInt(bound) != b.nextInt(bound) || a.nextLong() != b.nextLong()
            || a.nextDouble() != b.nextDouble() || a.nextFloat() != b.nextFloat()) {
          throw new IllegalStateException("Legacy != java.util.Random at seed " + s);
        }
      }
    }

    out.append("{");
    key("seeds"); { List<String> xs = new ArrayList<>(); for (long s : SEEDS) xs.add(L(s)); out.append(list(xs)); }
    key("legacy"); { List<String> xs = new ArrayList<>(); for (long s : SEEDS) xs.add(list(seq(new Legacy(s)))); out.append(list(xs)); }
    key("xoroshiro"); { List<String> xs = new ArrayList<>(); for (long s : SEEDS) xs.add(list(seq(new Xoroshiro(s)))); out.append(list(xs)); }
    key("upgrade"); { List<String> xs = new ArrayList<>(); for (long s : SEEDS) { long[] u = upgrade(s); xs.add("[" + L(u[0]) + "," + L(u[1]) + "]"); } out.append(list(xs)); }

    String[] names = {"", "minecraft:continentalness", "octave_-9", "minecraft:terrain", "中文 ID ✓", "a".repeat(200)};
    key("hashNames"); { List<String> xs = new ArrayList<>(); for (String n : names) xs.add("\"" + n + "\""); out.append(list(xs)); }
    key("hashSeeds"); { List<String> xs = new ArrayList<>(); for (String n : names) { long[] u = seedFromHashOf(n); xs.add("[" + L(u[0]) + "," + L(u[1]) + "]"); } out.append(list(xs)); }
    key("stringHash"); { List<String> xs = new ArrayList<>(); for (String n : names) xs.add(String.valueOf(n.hashCode())); out.append(list(xs)); }

    int[][] coords = {{0, 0, 0}, {1, 2, 3}, {-1, -64, -1}, {30000000, 320, -30000000}, {123, 45, 678}};
    key("getSeed"); { List<String> xs = new ArrayList<>(); for (int[] c : coords) xs.add(L(getSeed(c[0], c[1], c[2]))); out.append(list(xs)); }
    key("coords"); { List<String> xs = new ArrayList<>(); for (int[] c : coords) xs.add("[" + c[0] + "," + c[1] + "," + c[2] + "]"); out.append(list(xs)); }

    key("positional"); {
      List<String> xs = new ArrayList<>();
      for (long s : SEEDS) {
        PositionalRandomFactory fx = new Xoroshiro(s).forkPositional();
        PositionalRandomFactory fl = new Legacy(s).forkPositional();
        List<String> ys = new ArrayList<>();
        ys.add(L(fx.fromHashOf("minecraft:continentalness").nextLong()));
        ys.add(L(fx.at(1, 2, 3).nextLong()));
        ys.add(L(fx.at(-30000000, -64, 29999999).nextLong()));
        ys.add(L(fl.fromHashOf("minecraft:continentalness").nextLong()));
        ys.add(L(fl.at(1, 2, 3).nextLong()));
        xs.add(list(ys));
      }
      out.append(list(xs));
    }

    key("points"); { List<String> xs = new ArrayList<>(); for (double[] p : POINTS) xs.add("[" + d(p[0]) + "," + d(p[1]) + "," + d(p[2]) + "]"); out.append(list(xs)); }

    key("improved"); {
      List<String> xs = new ArrayList<>();
      for (long s : SEEDS) {
        ImprovedNoise n = new ImprovedNoise(new Xoroshiro(s));
        ImprovedNoise m = new ImprovedNoise(new Legacy(s));
        List<String> ys = new ArrayList<>();
        for (double[] p : POINTS) {
          ys.add(d(n.noise(p[0], p[1], p[2], 0, 0)));
          ys.add(d(m.noise(p[0], p[1], p[2], 0, 0)));
          ys.add(d(n.noise(p[0], p[1], p[2], 0.7, 0.3)));
        }
        xs.add(list(ys));
      }
      out.append(list(xs));
    }

    // NormalNoise：按 RandomState 的路径实例化 minecraft:continentalness
    double[] cont = {1, 1, 2, 2, 2, 1, 1, 1, 1};
    key("normal"); {
      List<String> xs = new ArrayList<>();
      for (long s : SEEDS) {
        PositionalRandomFactory f = new Xoroshiro(s).forkPositional();
        NormalNoise n = new NormalNoise(f.fromHashOf("minecraft:continentalness"), -9, cont);
        List<String> ys = new ArrayList<>();
        ys.add(d(n.maxValue));
        for (double[] p : POINTS) ys.add(d(n.getValue(p[0], p[1], p[2])));
        xs.add(list(ys));
      }
      out.append(list(xs));
    }

    key("blended"); {
      List<String> xs = new ArrayList<>();
      int[][] bp = {{0, 0, 0}, {17, 64, -33}, {-1000, -64, 2000}, {123456, 200, -654321}};
      for (long s : SEEDS) {
        PositionalRandomFactory f = new Xoroshiro(s).forkPositional();
        Blended b = new Blended(f.fromHashOf("minecraft:terrain"), 0.25, 0.125, 80.0, 160.0, 8.0);
        List<String> ys = new ArrayList<>();
        for (int[] p : bp) ys.add(d(b.compute(p[0], p[1], p[2])));
        xs.add(list(ys));
      }
      out.append(list(xs));
    }

    key("simplex"); {
      List<String> xs = new ArrayList<>();
      for (long sd : SEEDS) {
        Legacy r = new Legacy(sd); r.consumeCount(17292);
        Simplex sx = new Simplex(r);
        List<String> ys = new ArrayList<>();
        for (double[] p : POINTS) ys.add(d(sx.getValue(p[0], p[2])));
        int[][] ep = {{0, 0}, {100, 0}, {1000, -1000}, {-5000, 3000}, {123457, -98765}, {12345678, 7654321}};
        for (int[] e : ep) ys.add(d((double) endHeight(sx, e[0] / 8, e[1] / 8)));
        xs.add(list(ys));
      }
      out.append(list(xs));
    }

    key("spline"); {
      float[] loc = {-1.1F, -1.02F, -0.51F, -0.44F, -0.18F, -0.16F, -0.15F, 0.03F, 0.06F, 1.0F};
      float[] val = {0.044F, -0.2222F, -0.2222F, -0.12F, -0.12F, -0.05F, -0.05F, 0.0F, 0.3F, 0.6F};
      float[] der = {0.0F, 0.0F, 0.0F, 0.0F, 0.0F, 0.1F, 0.0F, 0.5F, 0.2F, 0.0F};
      List<String> xs = new ArrayList<>();
      double[] inputs = {-2.0, -1.1, -1.05, -0.6, -0.17, -0.155, 0.0, 0.031, 0.5, 1.0, 3.0, 0.123456789};
      for (double in : inputs) xs.add("[" + d(in) + "," + d((double) spline((float) in, loc, val, der)) + "]");
      out.append(list(xs));
    }

    key("biome"); {
      List<String> xs = new ArrayList<>();
      for (long sd : SEEDS) {
        List<String> ys = new ArrayList<>();
        long z = 0;
        try { z = obfuscateSeed(sd); } catch (Exception ex) { throw new RuntimeException(ex); }
        ys.add(L(z));
        int[][] bp = {{0, 64, 0}, {1, 64, 1}, {2, 63, 3}, {-1, -64, -1}, {17, 100, -33}, {-1000, 0, 2000}, {123457, 70, -654321}, {30000000, 300, -29999999}};
        for (int[] p : bp) { int[] q = zoom(z, p[0], p[1], p[2]); ys.add("[" + q[0] + "," + q[1] + "," + q[2] + "]"); }
        xs.add(list(ys));
      }
      out.append(list(xs));
    }

    key("perlinSimplex"); {
      // 原版 Biome 的三个写死种子的噪声：TEMPERATURE(1234,[0])、FROZEN_TEMPERATURE(3456,[-2,-1,0])、BIOME_INFO(2345,[0])
      long[] seeds = {1234L, 3456L, 2345L};
      int[][] octs = {{0}, {-2, -1, 0}, {0}};
      List<String> xs = new ArrayList<>();
      for (int t = 0; t < 3; t++) {
        PerlinSimplex n = new PerlinSimplex(new Legacy(seeds[t]), octs[t]);
        List<String> ys = new ArrayList<>();
        for (double[] p : POINTS) ys.add(d(n.getValue(p[0] * 0.05, p[2] * 0.05)));
        xs.add(list(ys));
      }
      out.append(list(xs));
    }

    key("quantize"); {
      float[] fs = {-1.0F, -0.93333334F, -0.7666667F, -0.56666666F, -0.45F, -0.2225F, -0.11F, 0.03F, 0.05F, 0.26666668F, 0.55F, 1.1F, 0.123456F, -0.987654F};
      List<String> xs = new ArrayList<>();
      for (float f : fs) xs.add(L(quantize(f)));
      out.append(list(xs));
    }

    key("clayBands"); {
      // SurfaceSystem.generateBands：XoroshiroRandomSource(seed).forkPositional().fromHashOf("minecraft:clay_bands") 抽出来的随机数序列
      List<String> xs = new ArrayList<>();
      for (long sd : SEEDS) {
        RandomSource r = new Xoroshiro(sd).forkPositional().fromHashOf("minecraft:clay_bands");
        String[] bs = new String[192]; java.util.Arrays.fill(bs, "t");
        for (int i = 0; i < bs.length; ++i) { i += r.nextInt(5) + 1; if (i < bs.length) bs[i] = "o"; }
        String[][] specs = {{"1", "y"}, {"2", "b"}, {"1", "r"}};
        for (String[] sp : specs) { int base = Integer.parseInt(sp[0]); int j = r.nextInt(10) + 6; for (int k = 0; k < j; ++k) { int l = base + r.nextInt(3); int m = r.nextInt(bs.length); for (int n = 0; m + n < bs.length && n < l; ++n) bs[m + n] = sp[1]; } }
        int j = r.nextInt(7) + 9; int k = 0;
        for (int l = 0; k < j && l < bs.length; l += r.nextInt(16) + 4) { bs[l] = "w"; if (l - 1 > 0 && r.nextBoolean()) bs[l - 1] = "g"; if (l + 1 < bs.length && r.nextBoolean()) bs[l + 1] = "g"; ++k; }
        xs.add("\"" + String.join("", bs) + "\"");
      }
      out.append(list(xs));
    }

    out.append("\n}\n");
    new java.io.PrintStream(new java.io.FileOutputStream(java.io.FileDescriptor.out), true, StandardCharsets.UTF_8).print(out);
  }
}
