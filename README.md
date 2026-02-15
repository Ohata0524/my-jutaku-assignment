erDiagram
    User ||--o{ Project : "作成(Admin)"
    User ||--o{ Entry : "申込(User)"
    Project ||--o{ Entry : "受付"

    User {
        String id PK "ユーザーID"
        String email UK "メールアドレス"
        String password "パスワード"
        String name "氏名"
        Role role "役割"
    }
    Project {
        String id PK "案件ID"
        String title "案件名"
        String detail "詳細"
        String skills "スキル"
        Int unitPrice "単価"
        DateTime deadline "締切"
        DateTime deletedAt "削除フラグ"
        String authorId FK "作成者ID"
    }
    Entry {
        String id PK "エントリーID"
        String userId FK "ユーザーID"
        String projectId FK "案件ID"
        String status "ステータス"
    }
    