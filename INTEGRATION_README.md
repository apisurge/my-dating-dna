# My Dating DNA - Affiliate System Integration

## Overview

This project has been successfully integrated with a comprehensive affiliate system, replacing the previous ezsite-based implementation with a native MongoDB and NextAuth solution.

## What Was Integrated

### 1. Authentication System
- **Replaced**: ezsite authentication
- **With**: NextAuth.js with JWT strategy
- **Benefits**: Better security, session management, and integration with main app

### 2. Database Migration
- **From**: ezsite table operations
- **To**: MongoDB with Mongoose models
- **New Models**:
  - `Affiliate` - Affiliate user accounts
  - `Campaign` - Marketing campaigns
  - `Destination` - Campaign destinations for link rotation
  - `ClickTracking` - Click and conversion tracking
  - `StripeEvent` - Stripe webhook event logging
  - `ProgramSettings` - Affiliate program configuration
  - `Commission` - Commission tracking (existing, enhanced)
  - `Order` - Order tracking (existing, enhanced)

### 3. API Integration
- **New Endpoints**:
  - `/api/affiliate/register` - Affiliate registration
  - `/api/affiliate/dashboard` - Affiliate dashboard data
  - `/api/affiliate/admin` - Admin management endpoints
  - `/api/affiliate/redirect/[code]` - Affiliate link tracking
  - `/api/affiliate/link-generator` - Generate affiliate links
  - `/api/track-affiliate` - Track affiliate clicks

### 4. Stripe Webhook Unification
- Unified webhook handler for both main app and affiliate features
- Automatic commission creation on successful payments
- Support for refunds and disputes
- 180-day cookie tracking
- 30-day commission hold period

### 5. Component Integration
- Updated AuthGuard and AdminGuard to use NextAuth
- Consolidated UI components
- Updated AdminNavigation for role-based access

## Key Features

### Affiliate System
- **40% commission rate** (configurable)
- **180-day cookie tracking**
- **30-day commission hold** before payouts
- **Last-click attribution** model
- **Real-time analytics** and reporting
- **Admin management** panel
- **Automatic commission voiding** for refunds/disputes

### Link Tracking
- Multiple link formats:
  - `?ref=AFFILIATECODE` (simple)
  - `/api/affiliate/redirect/CODE?dest=/path` (tracked)
- UTM parameter support
- Device and geolocation tracking
- Conversion tracking

### Admin Features
- Affiliate approval/rejection
- Commission management
- Payout processing
- Analytics and reporting
- Campaign management
- Link rotation
- Trust & safety tools

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── affiliate/           # Affiliate API endpoints
│   │   ├── track-affiliate/     # Click tracking
│   │   └── webhooks/stripe/     # Unified Stripe webhook
│   └── (affiliate)/             # Affiliate pages
├── components/
│   └── affiliate-hub/           # Affiliate UI components
├── lib/
│   ├── models/                  # MongoDB models
│   └── affiliate-hub/           # Affiliate utilities
└── middleware.ts                # Affiliate tracking middleware
```

## Configuration

### Environment Variables
Copy `.env.example` to `.env.local` and configure:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/mydatingdna

# NextAuth
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Affiliate System
AFFILIATE_WEBHOOK_SECRET=whsec_...
CRON_SECRET=your-cron-secret-here
```

### Stripe Webhook Configuration
Set up webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`

Required events:
- `checkout.session.completed`
- `charge.refunded`
- `charge.dispute.created`
- `invoice.payment_succeeded`

## Usage

### For Affiliates
1. **Registration**: Visit `/affiliates` to register
2. **Dashboard**: View performance at `/affiliates`
3. **Link Generation**: Create affiliate links
4. **Analytics**: Track clicks, conversions, and earnings

### For Admins
1. **Admin Panel**: Access at `/affiliates/manage-affiliates`
2. **Approve/Reject**: Manage affiliate applications
3. **Payouts**: Process monthly commissions
4. **Settings**: Configure program parameters

### Integration with Main App
- Affiliate tracking is automatic via middleware
- Commissions are created automatically on Stripe payments
- No changes needed to existing checkout flow

## Development

### Running the Application
```bash
npm run dev
```

### Database Setup
The MongoDB models will auto-create collections on first use.

### Testing Affiliate Features
1. Register as an affiliate
2. Generate affiliate links
3. Test purchases with affiliate tracking
4. Verify commissions are created

## Migration Notes

### Removed Dependencies
- All `window.ezsite` API calls
- Old ezsite-based authentication
- Duplicate UI components
- Old `mydatingdna-aff-hub` directory

### Preserved Features
- All existing affiliate functionality
- Commission calculation logic
- Payout processing
- Analytics and reporting
- Admin management tools

## Security Considerations

- Affiliate cookies are HTTP-only and secure
- Admin routes require proper authentication
- Stripe webhooks are properly verified
- Commission holds prevent fraudulent payouts
- Audit logging for all admin actions

## Performance Optimizations

- MongoDB indexes for fast queries
- Efficient affiliate lookup
- Async click tracking
- Proper error handling
- Background webhook processing

## Troubleshooting

### Common Issues
1. **Authentication errors**: Check NEXTAUTH_SECRET and NEXTAUTH_URL
2. **Database errors**: Verify MONGODB_URI connection
3. **Webhook failures**: Check STRIPE_WEBHOOK_SECRET
4. **Commission not created**: Verify affiliate cookie and Stripe metadata

### Logs to Check
- Affiliate tracking: Browser network tab
- Commission creation: Server logs during checkout
- Webhook processing: Stripe dashboard events
- Authentication: NextAuth debug logs

## Support

For technical support or questions about the affiliate system integration, please refer to the main project documentation or contact the development team.
