/**
 * v6：从原版服务端导出每个方块状态的光照属性（tools/vanilla/gen-light.py 调用）。
 *
 * 输出一行一个状态：状态  是否默认状态  lightBlock  lightEmission
 * 原版 jar 是混淆过的（1.21.4 server）：ab.a() = SharedConstants.tryDetectVersion，akx.a() = Bootstrap.bootStrap，
 * mb.e = BuiltInRegistries.BLOCK，djn = Block（m() 默认状态，l() 状态定义），dwy = BlockState（g() lightBlock，k() lightEmission）。
 */
public class LightDump {
  public static void main(String[] args) throws Exception {
    ab.a();
    akx.a();
    StringBuilder out = new StringBuilder();
    for (Object o : mb.e) {
      djn b = (djn) o;
      dwy def = b.m();
      for (Object so : b.l().a()) {
        dwy s = (dwy) so;
        out.append(s).append('\t').append(s == def ? 1 : 0).append('\t').append(s.g()).append('\t').append(s.k()).append('\n');
      }
    }
    java.nio.file.Files.writeString(java.nio.file.Path.of(args[0]), out.toString());
  }
}
