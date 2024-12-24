import path from "node:path";
import { readFileSync } from "node:fs";
interface DefineConfig {
  metadata?: {
    title?: string;
    keywords?: string[];
    description?: string;
  };
  appdir?: string;
  publicdir?: string;
  devserver?: {
    static?: string;
    port?: number;
    open?: boolean;
  };
  postsdir?: string;
}

const defineConfig = (options?: DefineConfig): DefineConfig => {
  return options ?? {};
};

let _config: DefineConfig | undefined = undefined;
function loadConfig() {
  if (!_config) {
    try {
      const pkgFile = path.join(process.cwd(), "lwe8.json");
      _config = JSON.parse(readFileSync(pkgFile, "utf8"));
    } catch {
      _config = {};
    }
  }

  return _config;
}
const con = loadConfig();
const userConfig: DefineConfig = {
  metadata: {
    title: con?.metadata?.title ?? "",
    keywords: con?.metadata?.keywords ?? [],
    description: con?.metadata?.description ?? "",
  },
  devserver: {
    static: path.join(process.cwd(), con?.devserver?.static || ".lwe8"),
    port: con?.devserver?.port ?? 5457,
    open: con?.devserver?.open ?? false,
  },
  appdir: path.join(process.cwd(), con?.appdir || "app"),
  publicdir: path.join(process.cwd(), con?.publicdir || "public"),
  postsdir: path.join(process.cwd(), con?.postsdir || "posts"),
};

const postDir = userConfig.postsdir as string;
const appDir = userConfig.appdir as string;
const publicDir = userConfig.publicdir as string;
export { userConfig, postDir, appDir, publicDir };
