import { Core } from "../Core";

/**
 * Структура функции для запуска хэндлера
 *
 * @interface
 */
interface HandlerRunOptions {
	/**
	 * Клиент.
	 *
	 * @type {Core}
	 */
	client: Core;

	/**
	 * Сам хэндлер.
	 *
	 * @type {HandlerStructureOptions}
	 */
	structure: HandlerStructureOptions;
}

/**
 * Структура хэндлера
 *
 * @interface
 */
interface HandlerStructureOptions {
	/**
	 * Имя хэндлера.
	 *
	 * @type {string}
	 */
	name: string;

	/**
	 * Функция для запуска хэндлера.
	 *
	 * @type {CallableFunction}
	 * @param {HandlerRunOptions} options Параметры переданные для запуска хэндлера
	 * @returns {Promise<unknown>}
	 */
	run: (options: HandlerRunOptions) => Promise<unknown>;
}

/**
 * Хэндлер
 *
 * ---
 * @example
 * ```ts
 * const handler = new Handler({
 *      name: "launch",
 *
 *      run: async ({ structure }) => {
 *          console.log(`${structure.name} Запущен!`)
 *      }
 * });
 * ```
 * ---
 *
 * @class
 * @implements {HandlerStructureOptions}
 */
export class Handler implements HandlerStructureOptions {
	public name!: string;

	public readonly run: (options: HandlerRunOptions) => Promise<unknown> = async () => {
		throw new Error(`У хэндлера ${this.name} нет функции для запуска!`);
	};

	constructor(options: HandlerStructureOptions) {
		if (!options.name) throw new Error(`[${__filename}]: У хэндлера нет имени!`);

		Object.assign(this, options);
	}
}
