/**
 * Cloudflare Email Worker — routes incoming email for cbarrgs.com
 *
 * Routes:
 *   contact@cbarrgs.com   → forwards to Cbarrgs + developer backup
 *   bookings@cbarrgs.com  → forwards to Cbarrgs + developer backup
 *   noreply@cbarrgs.com   → reject (no replies to system emails)
 *   *@cbarrgs.com         → reject (catch-all)
 *
 * Setup in Cloudflare Dashboard:
 *   1. Enable Email Routing for cbarrgs.com
 *   2. Add verified destination emails (cbarrgs@gmail.com + joe@joestechsolutions.com)
 *   3. Create Email Worker route: *@cbarrgs.com → this worker
 *   4. Set FORWARD_TO env var to primary (cbarrgs@gmail.com)
 *   5. Set FORWARD_TO_BACKUP env var to backup (joe@joestechsolutions.com)
 */

interface Env {
  FORWARD_TO: string; // Primary: Cbarrgs' personal email (cbarrgs@gmail.com)
  FORWARD_TO_BACKUP?: string; // Backup: Developer email (joe@joestechsolutions.com)
}

export default {
  async email(message: ForwardableEmailMessage, env: Env): Promise<void> {
    const to = message.to.toLowerCase();

    // Route based on recipient address
    switch (to) {
      case 'contact@cbarrgs.com':
      case 'bookings@cbarrgs.com':
        // Forward to primary (Cbarrgs) and backup (developer) in parallel
        await Promise.all([
          message.forward(env.FORWARD_TO),
          ...(env.FORWARD_TO_BACKUP ? [message.forward(env.FORWARD_TO_BACKUP)] : []),
        ]);
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
