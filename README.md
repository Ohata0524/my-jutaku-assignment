---
## データベース設計 (ER図)
以下のER図に基づき、データベースを設計・構築しました。

```mermaid
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
    }
    Project {
        String id PK
        String title
        String detail
        String skills
        Int unitPrice
        DateTime deadline
        DateTime deletedAt
        String authorId FK
    }
    Entry {
        String id PK
        String userId FK
        String projectId FK
        String status
    }
    