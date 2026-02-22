erDiagram
    User ||--o{ Project : "作成(Admin)"
    User ||--o{ Entry : "申込(User)"
    Project ||--o{ Entry : "受付"

    User {
        String id PK
        String email UK
        String password
        String name
        Role role
        DateTime created_at
        DateTime updated_at
    }
    Project {
        String id PK
        String title
        String detail
        String skills
        Int unit_price
        DateTime deadline
        DateTime deleted_at
        String user_id FK
        DateTime created_at
        DateTime updated_at
    }
    Entry {
        String id PK
        String user_id FK "UK"
        String project_id FK "UK"
        EntryStatus status
        DateTime created_at
        DateTime updated_at
    }