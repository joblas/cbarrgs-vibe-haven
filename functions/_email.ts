/**
 * Cloudflare Email Worker — routes incoming email for cbarrgs.com
 *
 * Routes:
 *   contact@cbarrgs.com   → forwards to Cbarrgs' personal email
 *   bookings@cbarrgs.com  → forwards to Cbarrgs' personal email
 *   noreply@cbarrgs.com   → reject (no replies to system emails)
 *   *@cbarrgs.com         → reject (catch-all)
 *
 * Setup in Cloudflare Dashboard:
 *   1. Enable Email Routing for cbarrgs.com
 *   2. Add verified destination email (Cbarrgs' personal email)
 *   3. Create Email Worker route: *@cbarrgs.com → this worker
 *   4. Set FORWARD_TO environment variable to Cbarrgs' personal email
 */

interface Env {
  FORWARD_TO: string; // Cbarrgs' personal email address
}

export default {
  async email(message: ForwardableEmailMessage, env: Env): Promise<void> {
    const to = message.to.toLowerCase();
    const forwardTo = env.FORWARD_TO;

    // Route based on recipient address
    switch (to) {
      case 'contact@cbarrgs.com':
      case 'bookings@cbarrgs.com':
        await message.forward(forwardTo);
        break;

      case 'noreply@cbarrgs.com':
        message.setReject('This address does not accept replies');
        break;

      default:
        // Catch-all: reject unknown addresses
        message.setReject('Address not found');
        break;
    }
  },
};
