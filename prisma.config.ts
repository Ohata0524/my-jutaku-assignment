// prisma.config.ts
export default {
  datasource: {
    // CI環境などで環境変数が空の場合、バリデーションエラーを防ぐためにダミーURLを設定します
    url: process.env.POSTGRES_URL || 'postgresql://postgres:postgres@localhost:5432/postgres',
  },
}
