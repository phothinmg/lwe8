/**
 * @typedef MetaData
 * @property {string}[title]
 * @property {string[]}[keywords]
 * @property {string}[description]
 */
/**
 * @typedef DevServer
 * @property {string}[static]
 * @property {number}[port]
 * @property {boolean}[open]
 */
/**
 * @typedef DefineConfig
 * @property {MetaData}[metadata]
 * @property {string}[appDir]
 * @property {{dir?: string;extensions?: string[]}}[public]
 * @property {DevServer} [devserver]
 */
/**
 *
 * @param {DefineConfig}[options]
 * @returns {DefineConfig}
 */
export const defineConfig = (options) => {
  return {
    metadata: {
      title: options.metadata.title ?? "",
      keywords: options.metadata.keywords ?? [],
      description: options.metadata.description ?? "",
    },
    appDir: options.appDir ?? "app",
    public: {
      dir: options.public?.dir ?? "public",
      extensions: options.public?.extensions ?? [],
    },
    devserver: {
      static: options.devserver?.static ?? ".lwe8",
      port: options.devserver?.port ?? 5457,
      open: options.devserver?.open ?? false,
    },
  };
};
