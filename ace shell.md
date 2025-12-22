# AdonisJS Ace CLI 命令参考

AdonisJS 的命令行工具 `Ace` 提供了丰富的指令来帮助开发、测试和维护应用。以下是可用命令的分类整理。

## 核心命令 (Core)

| 命令 | 说明 |
| :--- | :--- |
| `node ace serve` | 启动开发服务器（支持热重载） |
| `node ace build` | 编译应用到生产环境（编译 TypeScript 到 JavaScript） |
| `node ace test` | 运行测试（支持文件监听） |
| `node ace repl` | 启动一个新的 REPL 会话（交互式终端） |
| `node ace add [package]` | 安装并配置一个 AdonisJS 扩展包 |
| `node ace configure` | 配置已安装的包 |
| `node ace list` | 查看所有可用命令列表 |
| `node ace eject` | 将脚手架存根 (stubs) 导出到项目根目录以自定义 |

## 代码生成 (Make)

用于快速创建各类代码文件。

| 命令 | 生成内容 |
| :--- | :--- |
| `node ace make:controller` | HTTP 控制器 |
| `node ace make:model` | Lucid 数据模型 |
| `node ace make:migration` | 数据库迁移文件 |
| `node ace make:middleware` | HTTP 中间件 |
| `node ace make:validator` | VineJS 验证器 |
| `node ace make:test` | Japa 测试文件 |
| `node ace make:service` | 服务类 (Service) |
| `node ace make:event` | 事件类 |
| `node ace make:listener` | 事件监听器 |
| `node ace make:exception` | 自定义异常类 |
| `node ace make:factory` | 模型工厂 (Factory) |
| `node ace make:seeder` | 数据库填充器 (Seeder) |
| `node ace make:view` | Edge.js 模板文件 |
| `node ace make:command` | 自定义 Ace 命令 |
| `node ace make:provider` | 服务提供者 |
| `node ace make:preload` | 预加载文件 (在 start 目录中) |

## 数据库与迁移 (Database & Migration)

### 数据库操作 (DB)
| 命令 | 说明 |
| :--- | :--- |
| `node ace db:seed` | 执行数据库填充 (Seeders) |
| `node ace db:wipe` | 删除数据库中所有表、视图和类型 |
| `node ace db:truncate` | 清空数据库中所有表的数据 |

### 迁移管理 (Migration)
| 命令 | 说明 |
| :--- | :--- |
| `node ace migration:run` | **执行**待处理的迁移（更新数据库结构） |
| `node ace migration:rollback` | **回滚**最近一次迁移 |
| `node ace migration:status` | 查看迁移状态 |
| `node ace migration:reset` | 回滚所有迁移 |
| `node ace migration:refresh` | 回滚并重新运行所有迁移 |
| `node ace migration:fresh` | 删除所有表并重新运行所有迁移 |

## 其他实用工具

| 分类 | 命令 | 说明 |
| :--- | :--- | :--- |
| **Env** | `node ace env:add` | 添加新的环境变量 |
| **Generate** | `node ace generate:key` | 生成安全的随机应用密钥 (APP_KEY) |
| **Inspect** | `node ace inspect:rcfile` | 检查 RC 文件的默认值 |
| **List** | `node ace list:routes` | 列出应用的所有路由 |

## 常用选项
- `--help`: 查看特定命令的帮助信息 (例如 `node ace make:model --help`)
- `--ansi / --no-ansi`: 强制开启或关闭彩色输出
