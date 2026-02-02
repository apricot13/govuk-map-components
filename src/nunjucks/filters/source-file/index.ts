function sourceFile(url: string) {
  return url ? url.replace("://localstack", "://localhost") : url;
}

export default sourceFile;
