export interface Env {
	PRIVATE_KEY: string;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (request.method === 'OPTIONS') {
			return new Response('{}', {
				headers: {
					'access-control-allow-methods': 'GET, HEAD, POST, OPTIONS',
					'access-control-allow-origin': '*',
					'access-control-allow-headers': '*'
				}
			})
		}

		const url = new URL(request.url)
		const message = url.pathname.slice(1)

		try {
			const ethers = await import('ethers');
			const wallet = new ethers.Wallet(env.PRIVATE_KEY);

			const signedMessage = await wallet.signMessage(String(message));
			return new Response(signedMessage, {
				headers: {
					'access-control-allow-origin': '*'
				}
			});

		} catch (err: any) {
			return new Response(err.message, { headers: { 'access-control-allow-origin': '*' } });
		}
	},
};
