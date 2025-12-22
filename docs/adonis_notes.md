# AdonisJS 6 开发笔记

## 1. 验证器 (Validator) 架构设计

在 AdonisJS 6 + VineJS 中，为了实现优雅的错误提示管理，推荐采用“三层架构”：

### A. 全局配置层 (`start/validator.ts`)
负责定义全局通用的中文错误提示模板和常用字段别名。
- **作用**：兜底。当具体的验证器没有指定错误消息时，使用这里的默认配置。
- **示例**：
  ```typescript
  // start/validator.ts
  import vine, { SimpleMessagesProvider } from '@vinejs/vine'

  vine.messagesProvider = new SimpleMessagesProvider(
    {
      'required': '{{ field }} 不能为空',
      'maxLength': '{{ field }} 不能超过 {{ max }} 个字符',
    },
    {
      'title': '标题',
      'email': '邮箱',
    }
  )
  ```
- **注意**：需要在 `adonisrc.ts` 的 `preloads` 中注册该文件，确保应用启动时生效。

### B. 具体验证规则层 (`app/validators/xxx.ts`)
负责定义具体的业务验证规则。
- **高级用法**：可以继承全局配置，并针对特定字段进行“微调”。
- **示例**：
  ```typescript
  // app/validators/category.ts
  import { SimpleMessagesProvider } from '@vinejs/vine'
  import { validateFields, validateMessage } from './zh/lang.js' // 导入基础配置

  // 创建一个混合了全局配置和局部定制的消息提供者
  export const createCategoryMessagesValidator = new SimpleMessagesProvider(
    {
      ...validateMessage, // 继承全局规则
      maxLength: '{{ field }} 太长了，最多 {{ max }} 个字！', // 覆盖特定规则
    },
    {
      ...validateFields,  // 继承全局字段名
      title: '栏目名称',   // 覆盖特定字段名
    }
  )
  ```

### C. 控制器层 (`app/controllers/xxx_controller.ts`)
负责组合使用验证器和消息提供者。
- **示例**：
  ```typescript
  await request.validateUsing(createCategoryValidator, {
    messagesProvider: createCategoryMessagesValidator // 注入定制的消息提供者
  })
  ```

---

## 2. TypeScript 与 Node.js ESM 导入规范

在现代 Node.js ESM (ECMAScript Modules) 项目中（`package.json` 中 `"type": "module"`），TypeScript 的导入路径有一些反直觉的规定。

### 为什么导入 `.ts` 文件要写 `.js` 后缀？
当你写 `import ... from './lang.js'` 时：
1.  **TypeScript 编译器**：在编译阶段，它足够聪明，知道你是想导入 `lang.ts`，并会正确进行类型检查。
2.  **Node.js 运行时**：在运行阶段，它只认识编译后的 `.js` 文件。因为 TS 编译器遵循“不重写路径”原则，所以你在源码里写的路径必须是**编译后文件真实存在的路径**。

**规则**：
- 如果项目配置了 `"moduleResolution": "NodeNext"`（AdonisJS 6 默认配置），相对导入**必须**包含文件扩展名。
- 导入 `.ts` 文件 -> 写 `.js` 后缀。
- 导入目录下的 `index.ts` -> 必须写全 `/index.js`，不能省略。

### ESLint 文件命名规范
- **规则**：`@unicorn/filename-case`
- **要求**：文件名必须使用 `snake_case` (蛇形命名)，例如 `form_validator.ts`。
- **原因**：Windows/macOS 不区分大小写，而 Linux 区分。使用全小写蛇形命名可以避免在跨系统协作和 Git 同步时出现“文件找不到”的灵异问题。
