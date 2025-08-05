# Backend API Integrations

Этот документ описывает все подключения к бэкенду в админ панели приложения.

## 🔗 API Endpoints

Все эндпоинты основаны на документации из `back-end.md` и используют следующую структуру:
- **Прокси URL**: `/api/proxy?endpoint=${encodeURIComponent(endpoint)}`
- **Аутентификация**: `axiosInter` (для админ функций)
- **Base URL**: Все эндпоинты проксируются через Next.js API routes
- **Поддерживаемые методы**: GET, POST, PATCH
- **Админ токены**: Сохранены в `config/admin-tokens.json` для автоматической аутентификации

---

## 📋 Exchange Operations

### 1. **Stop Exchange** (Остановка обмена)
- **Компонент**: `ExchangeTable.tsx`
- **Эндпоинт**: `PATCH https://api.lizex.io/exchange/api/<unique_id>/transaction_stopped/`
- **Функция**: `ExchangeService.stopExchange()`
- **Данные**: Без тела запроса (только unique_id в URL)

```typescript
// Кнопка "Stop Exchange" - PATCH запрос
const result = await ExchangeService.stopExchange(unique_id);
```

### 2. **Manual Update Exchange** (Ручное обновление обмена)
- **Компонент**: `ManualUpdateModal.tsx`
- **Эндпоинт**: `PATCH /exchange/api/<unique_id>/edit/`
- **Функция**: `ExchangeService.updateExchange()`
- **Данные**:
  ```typescript
  {
    buy_orders: string[],              // Массив ордеров на покупку
    sell_orders: string[],             // Массив ордеров на продажу
    deposit: string,                   // Сумма депозита
    node_deposit: string,              // Депозит ноды
    withdrawal: string,                // Сумма вывода
    status: number,                    // Статус обмена (1-10)
    is_stopped: boolean,               // Остановлен ли обмен
    note: string                       // Заметка
  }
  ```

---

## ⚙️ General Settings

### 4. **General Settings Management** (Управление общими настройками)
- **Компонент**: `GeneralPage.tsx`
- **Сервис**: `GeneralService`
- **Множественные эндпоинты**:

#### Fee Settings (Настройки комиссий)
- **GET**: `/api/feesettings/` - получить настройки комиссий
- **PATCH**: `/api/feesettings/<pk>/` - обновить настройки комиссий
- **Поля**: `freeFixed`, `freeFloat`

#### Constants (Константы)
- **GET**: `/constant/api/numeric/<key>/` - получить числовую константу
- **PATCH**: `/constant/api/numeric/<key>/` - обновить числовую константу
- **GET**: `/constant/api/json/<key>/` - получить JSON константу  
- **PATCH**: `/constant/api/json/<key>/` - обновить JSON константу
- **Поля**: `riskScore`, `defaultAmount`, `defaultCurrency`

#### AML Threshold (Порог AML)
- **GET**: `/api/aml_threshold/value/` - получить порог AML
- **POST**: `/api/aml_threshold/` - изменить порог AML
- **Поле**: `riskScore` (альтернативный источник)

#### Network Gate (Сетевой шлюз)
- **POST**: `/network/api/toggle-gate/` - переключить gate
- **Поле**: `platformGate`

```typescript
// Сохранение отдельного поля
await GeneralService.updateFeeSetting(id, { fixed_fee: value });
await GeneralService.updateConstantNumeric('risk_score', value);
await GeneralService.updateConstantJson('default_currency', { from: 'BTC', to: 'USDT' });
await GeneralService.toggleNetworkGate();

// Загрузка всех настроек
const settings = await GeneralService.loadAllSettings();

// Сохранение всех настроек
await GeneralService.saveAllSettings(formData);
```

---

## 🛒 Order Operations

### 5. **Create Order** (Создание ордера)
- **Компонент**: `CreateOrderModal.tsx`
- **Эндпоинт**: `POST https://api.lizex.io/api/orders/`
- **Функция**: `AdminService.createOrder()`
- **Данные**:
  ```typescript
  {
    pair: string,                      // Пара валют (например, "BTC_USDT")
    amount: string,                    // Количество (например, "0.1")
    side: 'buy' | 'sell',             // Сторона ордера
    order_type: 'market' | 'limit',   // Тип ордера
    price: string,                     // Цена (например, "118337.49")
    platform: 'whitebit' | 'mexc'     // Платформа
  }
  ```

**Пример использования в родительском компоненте:**
```typescript
// В orders/page.tsx
const handleOrderCreated = () => {
  // Обновляем список ордеров после создания нового
  fetchData(currentParams);
};

<CreateOrderModal 
  isOpen={isModalOpen} 
  onClose={handleCloseModal} 
  onCreateSuccess={handleOrderCreated}
/>

// В exchange/page.tsx
const handleExchangeUpdated = () => {
  // Обновляем список обменов после обновления
  fetchData(currentParams);
};

<ExchangeTable 
  list={responseData?.results} 
  onExchangeUpdated={handleExchangeUpdated}
/>
```

---

## 📊 Status Mapping

### Exchange Statuses (ExchangeProcessStatus)
```typescript
const statusMapping = {
  'Waiting': 1,        // ожидание депозита
  'Confirmation': 2,   // получен депозит, ждем подтверждения
  'Transferring': 3,   // депозит подтвержден, переводим средства
  'Exchanging': 4,     // идет обмен на целевую монету
  'Sending': 5,        // отправляем средства пользователю
  'Success': 6,        // обмен завершен успешно
  'Overdue': 7,        // истекло время депозита
  'Frozen': 8,         // ордер заморожен
  'Problematic': 9,    // возникла проблема
  'Refunded': 10,      // средства возвращены
  'Pending': 2,        // маппинг на Confirmation
  'Failed': 9,         // маппинг на Problematic
};
```

---

## 🔧 Services Structure

### ExchangeService (`services/exchange/exchange.service.ts`)
```typescript
export const ExchangeService = {
  // Остановка обмена
  async stopExchange(uniqueId: string): Promise<any>
  
  // Обновление обмена
  async updateExchange(uniqueId: string, body: { status?: number; [key: string]: any }): Promise<any>
  
  // Получение обмена по ID
  async getExchangeByUniqueId(id: string): Promise<any>
  
  // Создание обмена
  async createExchange(body: CreateExchangeBody): Promise<any>
  
  // Котировки
  async quoteRangeWhitebit({ coin_id }: { coin_id: number }): Promise<any>
  async quoteOneWhitebit({ from_coin_id, to_coin_id, fee_type }): Promise<any>
}
```

### AdminService (`services/admin/admin.service.ts`)
```typescript
export const AdminService = {
  // Создание ордера
  async createOrder(body: CreateOrderBody): Promise<any>
  
  // Получение данных
  async getAllExchanges(params?: GetExchangeParams): Promise<ResponseList<GetExchangesItem>>
  async getOrders(params?: OrderParams): Promise<any>
  async getAllWithdrawals(params?: GetWithdrawalParams): Promise<ResponseList<GetWithdrawalItem>>
  async getAllDeposits(params?: DepositeParams): Promise<any>
}
```

### Admin Tokens (`utils/admin-tokens.ts`)
```typescript
export const getAdminTokens = (): AdminTokens
export const getAdminAccessToken = (): string
export const getAdminRefreshToken = (): string
export const isAdminAccessTokenExpired = (): boolean
export const isAdminRefreshTokenExpired = (): boolean
export const getAdminTokenInfo = () => { access: TokenInfo, refresh: TokenInfo }
```

### GeneralService (`services/general/general.service.ts`)
```typescript
export const GeneralService = {
  // Fee Settings
  async getFeeSettings(): Promise<FeeSettingsItem[]>
  async updateFeeSetting(id: number, data: Partial<FeeSettingsItem>): Promise<FeeSettingsItem>
  
  // Constants
  async getConstantNumeric(key: string): Promise<ConstantNumeric>
  async updateConstantNumeric(key: string, value: number): Promise<ConstantNumeric>
  async getConstantJson(key: string): Promise<ConstantJson>
  async updateConstantJson(key: string, value: any): Promise<ConstantJson>
  
  // AML Threshold
  async getAMLThreshold(): Promise<AMLThreshold>
  async updateAMLThreshold(value: number): Promise<AMLThreshold>
  
  // Network Gate
  async toggleNetworkGate(): Promise<NetworkGateResponse>
  
  // Helper methods
  async loadAllSettings(): Promise<Partial<GeneralFormState>>
  async saveAllSettings(formData: GeneralFormState): Promise<void>
}
```

---

## 🎯 Component Integration Patterns

### 1. **Modal Components**
Все модальные окна следуют единому паттерну:

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;  // Коллбэк для обновления родительского компонента
  data?: any;              // Данные для предзаполнения
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSuccess, data }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const result = await SomeService.someMethod(formData);
      if (result && !result.error) {
        if (onSuccess) onSuccess();
        onClose();
      } else {
        alert('Error: ' + result?.error);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Modal open={isOpen} onCancel={onClose}>
      {/* Form fields */}
      <Button loading={isLoading} onClick={handleSubmit}>
        {isLoading ? 'Processing...' : 'Submit'}
      </Button>
    </Modal>
  );
};
```

### 2. **Error Handling**
Все API вызовы используют консистентную обработку ошибок:

```typescript
try {
  const result = await ApiService.method(data);
  if (result && !result.error) {
    // Success
    console.log('Success:', result);
    if (onSuccess) onSuccess();
  } else {
    // API Error
    console.error('API Error:', result?.error);
    alert('Failed: ' + (result?.error || 'Unknown error'));
  }
} catch (error) {
  // Network/System Error
  console.error('System Error:', error);
  alert('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
}
```

### 3. **Loading States**
Все интерактивные элементы показывают состояние загрузки:

```typescript
const [isLoading, setIsLoading] = useState(false);

<Button 
  loading={isLoading}
  disabled={isLoading}
  onClick={handleAction}>
  {isLoading ? 'Processing...' : 'Action'}
</Button>
```

---

## 📝 Data Flow

```
Component → Service → API Config → Proxy Route → Backend API
    ↓         ↓           ↓            ↓            ↓
 UI State → Method → URL Builder → Next.js → External API
    ↑         ↑           ↑            ↑            ↑
Response ← Result ← Proxy Response ← HTTP Response ← API Response
```

### Example Flow: Stop Exchange
1. `ExchangeTable.tsx` → кнопка "Stop Exchange" 
2. `ExchangeService.stopExchange()` → вызов сервиса
3. `axiosInter.patch()` → HTTP запрос через interceptor
4. `/api/proxy?endpoint=exchange/api/{id}/transaction_stopped/` → прокси маршрут
5. `PATCH /exchange/api/{id}/transaction_stopped/` → реальный API эндпоинт
6. Response → Success/Error handling → UI Update

---

## 🔍 Debugging

### Console Logs
Все операции логируются в консоль:
- `Pre-filling modal with transaction data:` - данные для предзаполнения
- `Updating exchange with data:` - данные для обновления
- `Exchange updated successfully:` - успешное обновление
- `Creating order with data:` - данные для создания ордера
- `Order created successfully:` - успешное создание
- `Loaded settings:` - загруженные общие настройки
- `Fee settings fetched:` - полученные настройки комиссий
- `Numeric constant {key} updated:` - обновленная числовая константа
- `JSON constant {key} updated:` - обновленная JSON константа
- `Network gate toggled:` - переключение сетевого шлюза

### Network Tab
Проверьте Network tab в DevTools для:
- Прокси запросы: `/api/proxy?endpoint=...`
- HTTP методы: GET, POST, PATCH
- Response статусы: 200, 400, 500
- Request/Response bodies

---

## 🚀 Future Improvements

1. **Toast Notifications** вместо alert()
2. **Form Validation** с react-hook-form
3. **TypeScript Types** для всех API ответов
4. **Loading Skeletons** вместо простых индикаторов
5. **Retry Logic** для failed requests
6. **Optimistic Updates** для лучшего UX

---

## 📋 Summary

### ✅ **Подключенные интеграции**:
1. **Stop Exchange** - остановка обмена (кнопка в таблице)
2. **Manual Update Exchange** - ручное обновление (модальное окно)
3. **General Settings** - управление системными настройками (отдельная страница)
4. **Create Order** - создание ордеров (модальное окно)

### 🎯 **Покрытие API**:
- ✅ Exchange management (обмены)
- ✅ Order creation (ордера)  
- ✅ Fee settings (комиссии)
- ✅ Constants management (константы)
- ✅ AML threshold (AML порог)
- ✅ Network gate (сетевой шлюз)
- ✅ Admin authentication (админ аутентификация)

Все интеграции следуют единым принципам архитектуры и включают полную обработку ошибок, loading состояния и логирование для debugging.