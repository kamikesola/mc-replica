import java.lang.reflect.*;
import java.util.*;
import java.util.zip.*;

/**
 * v8.1：从原版服务端导出每个方块状态的属性（tools/vanilla/gen-blocks.py 调用）。
 *
 * 输出一行一个状态：状态  lightBlock  lightEmission  破坏时间  碰撞箱（x0,y0,z0,x1,y1,z1;...）
 * jar 是混淆过的。v6 的 LightDump 用的名字（ab.a、akx.a、mb.e、djn、dwy.g/k）是手查的；
 * 碰撞箱和破坏时间的方法名不手查，用反射按“签名 + 已知方块的值”认出来：
 *   碰撞箱：参数 (BlockGetter, BlockPos)、返回 VoxelShape 的方法里，栅栏高 1.5、一层雪是空的那个
 *   破坏时间：参数 (BlockGetter, BlockPos)、返回 float 的方法里，基岩 -1、石头 1.5 的那个
 */
public class BlockDump {
  static Object getter, pos;

  public static void main(String[] args) throws Exception {
    ab.a();
    akx.a();
    Map<String, dwy> byName = new HashMap<>();
    List<djn> blocks = new ArrayList<>();
    for (Object o : mb.e) blocks.add((djn) o);
    for (djn b : blocks) for (Object so : b.l().a()) byName.put(so.toString(), (dwy) so);

    // 找 (BlockGetter, BlockPos) 两个参数的方法，顺便拿到这两个类型
    List<Method> shapeMethods = new ArrayList<>(), floatMethods = new ArrayList<>();
    Class<?> getterT = null, posT = null, shapeT = null;
    for (Class<?> c = dwy.class; c != null; c = c.getSuperclass())
      for (Method m : c.getDeclaredMethods()) {
        Class<?>[] p = m.getParameterTypes();
        if (p.length != 2 || Modifier.isStatic(m.getModifiers()) || !p[0].isInterface() || p[1].isInterface()) continue;
        if (m.getReturnType() == float.class) floatMethods.add(m);
        else if (!m.getReturnType().isPrimitive() && m.getReturnType().getName().length() <= 4 && Modifier.isAbstract(m.getReturnType().getModifiers())) shapeMethods.add(m);
        else continue;
        getterT = p[0]; posT = p[1];
      }
    // BlockPos.ZERO：BlockPos 里类型是自己的静态字段
    for (Field f : posT.getDeclaredFields()) if (Modifier.isStatic(f.getModifiers()) && f.getType() == posT) { f.setAccessible(true); pos = f.get(null); break; }
    // EmptyBlockGetter.INSTANCE：实现了 BlockGetter 的枚举（在 jar 里找）
    try (ZipFile z = new ZipFile(args[1])) {
      for (Enumeration<? extends ZipEntry> e = z.entries(); e.hasMoreElements() && getter == null; ) {
        String n = e.nextElement().getName();
        if (!n.endsWith(".class") || n.contains("/")) continue;
        try {
          Class<?> c = Class.forName(n.substring(0, n.length() - 6), false, BlockDump.class.getClassLoader());
          if (c.isEnum() && getterT.isAssignableFrom(c)) getter = c.getEnumConstants()[0];
        } catch (Throwable t) {}
      }
    }
    if (getter == null || pos == null) throw new RuntimeException("没找到 EmptyBlockGetter / BlockPos.ZERO");

    Method collision = null;
    for (Method m : shapeMethods) {
      try {
        m.setAccessible(true);
        double fence = maxY(m.invoke(byName.get("Block{minecraft:oak_fence}[east=false,north=false,south=false,waterlogged=false,west=false]"), getter, pos));
        double snow = maxY(m.invoke(byName.get("Block{minecraft:snow}[layers=1]"), getter, pos));
        if (fence == 1.5 && snow == -1) { collision = m; break; }
      } catch (Throwable t) {}
    }
    Method destroy = null;
    for (Method m : floatMethods) {
      try {
        m.setAccessible(true);
        float bed = (float) m.invoke(byName.get("Block{minecraft:bedrock}"), getter, pos);
        float stone = (float) m.invoke(byName.get("Block{minecraft:stone}"), getter, pos);
        if (bed == -1f && stone == 1.5f) { destroy = m; break; }
      } catch (Throwable t) {}
    }
    if (collision == null || destroy == null) throw new RuntimeException("没认出方法：collision=" + collision + " destroy=" + destroy);
    System.err.println("碰撞箱 " + collision + "\n破坏时间 " + destroy);

    StringBuilder out = new StringBuilder();
    for (djn b : blocks)
      for (Object so : b.l().a()) {
        dwy s = (dwy) so;
        out.append(s).append('\t').append(s.g()).append('\t').append(s.k()).append('\t').append((float) destroy.invoke(s, getter, pos)).append('\t');
        List<String> boxes = new ArrayList<>();
        for (double[] a : boxes(collision.invoke(s, getter, pos))) boxes.add(a[0] + "," + a[1] + "," + a[2] + "," + a[3] + "," + a[4] + "," + a[5]);
        out.append(String.join(";", boxes)).append('\n');
      }
    java.nio.file.Files.writeString(java.nio.file.Path.of(args[0]), out.toString());
  }

  /** VoxelShape.toAabbs()：返回 List、没有参数的方法；AABB 的 6 个 double 字段按声明顺序是 minX minY minZ maxX maxY maxZ */
  static List<double[]> boxes(Object shape) throws Exception {
    List<double[]> out = new ArrayList<>();
    for (Class<?> c = shape.getClass(); c != null; c = c.getSuperclass())
      for (Method m : c.getDeclaredMethods()) {
        if (m.getParameterCount() != 0 || m.getReturnType() != List.class || Modifier.isStatic(m.getModifiers())) continue;
        m.setAccessible(true);
        for (Object box : (List<?>) m.invoke(shape)) {
          double[] a = new double[6];
          int i = 0;
          for (Field f : box.getClass().getDeclaredFields()) {
            if (f.getType() != double.class || Modifier.isStatic(f.getModifiers())) continue;
            f.setAccessible(true);
            if (i < 6) a[i++] = f.getDouble(box);
          }
          out.add(a);
        }
        return out;
      }
    return out;
  }

  static double maxY(Object shape) throws Exception {
    double y = -1;
    for (double[] a : boxes(shape)) y = Math.max(y, a[4]);
    return y;
  }
}
