declare global {
	namespace NodeJS {
		interface ProcessEnv {
			/**
			 * Токен для запуска Discord бота.
			 *
			 * @type {string}
			 */
			TOKEN: string;
		}
	}
}

export {};
