import { ButtonInteraction, PermissionResolvable } from "discord.js";
import { Core } from "../Core";

/**
 * Структура фукнции для запуска кнопки
 *
 * @interface
 */
interface ButtonRunOptions {
	/**
	 * Клиент.
	 *
	 * @type {Core}
	 */
	client: Core;

	/**
	 * Взаимодействие с кнопкой
	 *
	 * @type {ButtonInteraction}
	 */
	interaction: ButtonInteraction;

	/**
	 * Сама кнопка.
	 *
	 * @type {ButtonStructureOptions}
	 */
	structure: ButtonStructureOptions;
}

/**
 * Структура кнопки
 *
 * @interface
 */
interface ButtonStructureOptions {
	/**
	 * Имя кнопки. Должно быть как customID у interaction
	 *
	 * @type {string | string[]}
	 */
	name: string | string[];

	/**
	 * Массив строк с айди серверов в которых можно использовать данную кнопку.
	 *
	 * @type {string[]}
	 */
	guildIDs?: string[];

	/**
	 * Массив строк с айди пользователей которые могут использовать данную кнопку.
	 *
	 * @type {string[]}
	 */
	userIDs?: string[];

	/**
	 * Массив с разрешениями для использования этой кнопки.
	 *
	 * @type {PermissionResolvable[]}
	 */
	permissions?: PermissionResolvable[];

	/**
	 * Должна ли данная кнопка запускаться в личных сообщениях.
	 *
	 * @type {boolean}
	 */
	runInDM?: boolean;

	/**
	 * Должна ли данная кнопка запускаться в канале с пометкой NSFW.
	 *
	 * @type {boolean}
	 */
	nsfwOnly?: boolean;

	/**
	 * Должен ли эту кнопку использовать только разработчик.
	 *
	 * @type {boolean}
	 */
	devOnly?: boolean;

	/**
	 * Функция для запуска кнопки.
	 *
	 * @type {CallableFunction}
	 * @param {ButtonRunOptions} options Параметры переданные для запуска кнопки
	 * @returns {Promise<unknown>}
	 */
	run: (options: ButtonRunOptions) => Promise<unknown>;
}

/**
 * Кнопка.
 *
 * ---
 * @example
 * ```ts
 * const button = new Button({
 *      name: "ping",
 *
 *      run: async ({ interaction }) => {
 *          return await interaction.reply("Pong!")
 *      }
 * });
 * ```
 * ---
 *
 * @class
 * @implements {ButtonStructureOptions}
 */
export class Button implements ButtonStructureOptions {
	public name!: string | string[];

	public guildIDs?: string[] = [];
	public userIDs?: string[] = [];
	public permissions?: PermissionResolvable[] = [];
	public runInDM?: boolean = false;
	public nsfwOnly?: boolean = false;
	public devOnly?: boolean = false;

	public readonly run: (options: ButtonRunOptions) => Promise<unknown> = async () => {
		throw new Error(`У кнопки ${this.name} нет функции для запуска!`);
	};

	constructor(options: ButtonStructureOptions) {
		if (!options.name) throw new Error(`[${__filename}]: У кнопки нет имени!`);

		Object.assign(this, options);
	}
}
