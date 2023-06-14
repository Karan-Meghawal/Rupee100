declare module "coingate-v2" {
  export type ClientType = {
    createOrder(config: {
      order_id: string;
      price_amount: number;
      price_currency: string;
      receive_currency: string;
      title: string;
      description: string;
      callback_url: string;
      cancel_url: string;
      success_url: string;
    }): Promise<{
      token: string;
      payment_url: string;
    }>;
  };

  export function client(token: string): ClientType;
  export function testClient(token: string): ClientType;
  export function Config() {}
  export function Client() {}
}
