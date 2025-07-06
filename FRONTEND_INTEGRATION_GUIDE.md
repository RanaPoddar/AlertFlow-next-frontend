# Email Alerts Service - Frontend Integration Guide

This guide shows how to integrate the Next.js frontend with your Node.js backend.

## 🔧 Backend Configuration

### 1. Environment Variables

Create a `.env.local` file in your Next.js project root:

```bash
# Your Node.js backend URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# Or for production
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

### 2. Backend API Endpoints

Make sure your Node.js backend has these endpoints:

#### Authentication Routes
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/refresh-token` - Refresh JWT token

#### Email Service Routes
- `GET /api/emails` - Get all emails
- `POST /api/emails` - Create email alert
- `POST /api/services/subscribe` - Subscribe to email service
- `POST /api/services/unsubscribe` - Unsubscribe from email service

#### Alert Routes
- `POST /api/alerts/whatsapp` - Send WhatsApp alert
- `POST /api/alerts/telegram` - Send Telegram alert
- `POST /api/alerts/sms` - Send SMS alert

#### Statistics Routes
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/emails/stats` - Get email statistics
- `GET /api/alerts/stats` - Get alert statistics

#### Health Check
- `GET /health` - Health check endpoint

## 📦 Frontend Integration

### 1. Using Authentication

```typescript
// In your component
import { useAuth } from '@/hooks/useApi';

function LoginComponent() {
  const { login, loading, error, isAuthenticated } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    const result = await login({ email, password });
    if (result.success) {
      // User logged in successfully
      console.log('User:', result.user);
    } else {
      // Handle login error
      console.error('Login failed:', result.error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>Welcome! You are logged in.</div>
      ) : (
        <button onClick={() => handleLogin('user@example.com', 'password')}>
          Login
        </button>
      )}
    </div>
  );
}
```

### 2. Using Email Services

```typescript
import { useEmailService } from '@/hooks/useApi';

function EmailServiceComponent() {
  const { subscribe, unsubscribe, createEmailAlert, loading, error } = useEmailService();

  const handleSubscribe = async () => {
    const result = await subscribe({
      serviceId: 'newsletter',
      email: 'user@example.com',
      preferences: {
        frequency: 'daily',
        types: ['updates', 'promotions']
      }
    });

    if (result.success) {
      console.log('Subscribed successfully:', result.data);
    }
  };

  const handleCreateAlert = async () => {
    const result = await createEmailAlert({
      title: 'Price Drop Alert',
      description: 'Alert when price drops below $50',
      trigger: {
        type: 'price_drop',
        threshold: 50
      },
      recipients: ['user@example.com']
    });

    if (result.success) {
      console.log('Alert created:', result.data);
    }
  };

  return (
    <div>
      <button onClick={handleSubscribe} disabled={loading}>
        Subscribe to Newsletter
      </button>
      <button onClick={handleCreateAlert} disabled={loading}>
        Create Price Alert
      </button>
    </div>
  );
}
```

### 3. Using Alert Services

```typescript
import { useAlerts } from '@/hooks/useApi';

function AlertComponent() {
  const { sendWhatsAppAlert, sendTelegramAlert, sendSMSAlert, loading } = useAlerts();

  const handleWhatsAppAlert = async () => {
    const result = await sendWhatsAppAlert({
      phoneNumber: '+1234567890',
      message: 'Hello from your email alert service!',
      type: 'notification'
    });

    if (result.success) {
      console.log('WhatsApp alert sent:', result.data);
    }
  };

  const handleTelegramAlert = async () => {
    const result = await sendTelegramAlert({
      chatId: 'telegram_chat_id',
      message: 'Your Telegram alert is ready!',
      type: 'notification'
    });

    if (result.success) {
      console.log('Telegram alert sent:', result.data);
    }
  };

  return (
    <div>
      <button onClick={handleWhatsAppAlert} disabled={loading}>
        Send WhatsApp Alert
      </button>
      <button onClick={handleTelegramAlert} disabled={loading}>
        Send Telegram Alert
      </button>
    </div>
  );
}
```

### 4. Using Dashboard Statistics

```typescript
import { useDashboard } from '@/hooks/useApi';

function DashboardComponent() {
  const { stats, loading, fetchDashboardStats, fetchEmailStats } = useDashboard();

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  const handleRefreshStats = async () => {
    const emailStats = await fetchEmailStats();
    if (emailStats.success) {
      console.log('Email stats:', emailStats.data);
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading dashboard...</div>
      ) : (
        <div>
          <h2>Dashboard Statistics</h2>
          <pre>{JSON.stringify(stats, null, 2)}</pre>
          <button onClick={handleRefreshStats}>Refresh Stats</button>
        </div>
      )}
    </div>
  );
}
```

### 5. Direct API Usage (without hooks)

```typescript
import emailAlertsAPI from '@/lib/api';

// Direct API calls
async function directApiExample() {
  try {
    // Login
    const loginResult = await emailAlertsAPI.login({
      email: 'user@example.com',
      password: 'password123'
    });

    if (loginResult.success) {
      console.log('Login successful:', loginResult.data);

      // Subscribe to service
      const subscribeResult = await emailAlertsAPI.subscribe({
        serviceId: 'newsletter',
        email: 'user@example.com'
      });

      if (subscribeResult.success) {
        console.log('Subscription successful:', subscribeResult.data);
      }
    }
  } catch (error) {
    console.error('API error:', error);
  }
}
```

## 🛠️ Backend Requirements

Your Node.js backend should return responses in this format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Your response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

### Authentication Response
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

## 🔒 CORS Configuration

Make sure your Node.js backend has CORS configured to allow requests from your Next.js frontend:

```javascript
// In your Node.js backend
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-domain.com'],
  credentials: true
}));
```

## 🚀 Testing the Integration

1. Start your Node.js backend server
2. Start your Next.js frontend: `npm run dev`
3. Test the integration by using the components above
4. Check browser network tab to see API calls to your backend
5. Verify authentication tokens are properly stored and sent

## 📋 Checklist

- [ ] Backend endpoints are implemented
- [ ] CORS is configured
- [ ] Environment variables are set
- [ ] Authentication flow works
- [ ] API responses follow the expected format
- [ ] Error handling is implemented
- [ ] Health check endpoint is available

## 🐛 Troubleshooting

### Common Issues

1. **CORS Error**: Make sure your backend allows requests from your frontend domain
2. **Authentication Issues**: Check if JWT tokens are properly generated and validated
3. **API Endpoint Not Found**: Verify your backend routes match the frontend API calls
4. **Environment Variables**: Ensure `NEXT_PUBLIC_API_URL` is set correctly

### Debug Mode

Add this to your API class constructor for debugging:

```typescript
constructor() {
  this.baseURL = API_BASE_URL;
  this.token = null;
  
  // Debug mode
  if (process.env.NODE_ENV === 'development') {
    console.log('API Base URL:', this.baseURL);
  }
}
```

This integration guide provides everything you need to connect your Next.js frontend with your Node.js backend!
