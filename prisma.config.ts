export default {
  datasource: {
    // 環境変数が空でもビルドを落とさないよう、デフォルト値を設定
    url:
      process.env.POSTGRES_URL ||
      'postgresql://postgres:postgres@localhost:5432/postgres'
  }
}
