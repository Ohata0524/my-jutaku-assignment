export default {
  datasource: {
    // 環境変数が未定義の場合でもPrismaがエラーを出さないよう、デフォルト値を設定します
    url:
      process.env.POSTGRES_URL ||
      'postgresql://postgres:postgres@localhost:5432/postgres'
  }
}
