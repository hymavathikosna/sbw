const titles: Record<string, string> = {
  '/': 'Home',
  '/all-categories': 'All product categories',
  '/category/:slug': 'Category',
  '/signin': 'Sign in',
  '/user': 'Account',
  '/user/setting': 'Settings',
  '/user/setting/personal': 'Update personal information',
  '/user/setting/phone': 'Update phone number',
  '/user/setting/email': 'Update email',
  '/user/setting/password': 'Change password',
  '/user/wishlist': 'Favorite products',
  '/user/preorder': 'Pre-order products',
  '/user/review': 'Product reviews',
  '/user/notification': 'Notifications',
  '/cart': 'Shopping cart',
  '/order': 'Orders',
  '/order/detail/:code': 'Order details',
  '/user/chat': 'Consultation request',
  '/payment/success': 'Payment successful',
  '/payment/cancel': 'Payment canceled',
  '/user/reward': 'Reward points',
  '/signup': 'Sign up',
  '/forgot': 'Password reset request',

  '/admin': 'Admin',
};

const handler = {
  get: function (target: typeof titles, name: string) {
    return Object.prototype.hasOwnProperty.call(target, name) ? target[name] + ' – Electro' : 'Electro';
  },
};

const Titles = new Proxy(titles, handler);

export default Titles;
