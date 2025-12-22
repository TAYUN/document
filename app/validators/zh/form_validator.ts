import { SimpleMessagesProvider } from '@vinejs/vine'
import { validateFields, validateMessage } from './lang.js'

export const validateMessageProvider = (message = {}, fields = {}) => ({
  messagesProvider: new SimpleMessagesProvider(
    {
      ...validateMessage,
      ...message,
    },
    {
      ...validateFields,
      ...fields,
    }
  ),
})
