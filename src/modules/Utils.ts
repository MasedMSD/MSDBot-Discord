import { EmbedBuilder } from "discord.js";

/**
 * Функция для случайного числа
 *
 * ---
 * @example
 * ```ts
 * const test = random(0, 100, true);
 *
 * console.log(test) // Вернёт случайно число от 0 до 100, включая 100.
 * ```
 * ---
 *
 * @param {F} min Минимальное число
 * @param {S} max Максимальное число
 * @param {I} maxIncluded Должно ли возвращать максимальное число
 * @returns {number}
 */
export const random = <F extends number, S extends number, I extends boolean>(
	min: F,
	max: S,
	maxIncluded?: I
): number =>
	maxIncluded ? Math.floor(Math.random() * (max - min + 1)) + min : Math.floor(Math.random() * (max - min)) + min;

/**
 * Функция чтобы импортировать файл.
 * Нужна для работы обработчиков.
 *
 * @param {P} filePath Путь до файла
 * @returns {Promise<T>}
 */
export const importFile = async <P extends string, T>(filePath: P): Promise<T> => {
	return (await import(filePath))?.default;
};

/**
 * Проверяет, является ли заданный параметр числом
 *
 * ---
 * @example
 * ```ts
 * console.log(isNumeric("10")); // true
 * console.log(isNumeric("10asd")) // false
 * ```
 * ---
 *
 * @param {any} n Любой тип данных
 * @returns {boolean}
 */
export const isNumeric = (n: any): boolean => !isNaN(parseFloat(n)) && isFinite(n);

type EmbedColor = "Green" | "Red" | "Yellow";

/**
 * Более удобная функция ембеда для вывода ошибок, предупреждений и успешных действий.
 *
 * ---
 * @example
 * ```ts
 * const userErrorEmbed = embedResult("User Error", "User doesn't have enough permissisons!", "Fail");
 *
 * return await interaction.reply({ embeds: [userErrorEmbed] });
 * ```
 * ---
 *
 * @param {T} title Титульник эмбеда
 * @param {D} description Описание
 * @param {"Success" | "Fail" | "Warn"} type Тип эмбеда. Success | Fail | Warn
 * @returns {EmbedBuilder}
 */
export const embedResult = <T extends string, D extends string>(
	title: T,
	description: D,
	type: "Success" | "Fail" | "Warn"
): EmbedBuilder => {
	const color: EmbedColor = type === "Success" ? "Green" : type === "Fail" ? "Red" : "Yellow";
	const icon: string = type === "Success" ? "✅" : type === "Fail" ? "❌" : "⚠️";

	return new EmbedBuilder({
		title: `${icon}・${title}`,
		description: description || undefined,
	})
		.setColor(color)
		.setTimestamp();
};
