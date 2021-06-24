/* eslint-disable @typescript-eslint/no-explicit-any */
import { fluent, FluentIterable, fluentObject } from '@codibre/fluent-iterable';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getIterableIterator<T>(getter: () => FluentIterable<any>) {
	const result = (getter() as unknown) as IterableIterator<T>;

	const current = result[Symbol.iterator];
	result[Symbol.iterator] = () => {
		const iterator: any = current();
		iterator[Symbol.iterator] = () => result[Symbol.iterator]();

		return iterator;
	};

	return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class RecordMap<
		T extends Record<K, V>,
		K extends keyof T = keyof T,
		V extends T[K] = T[K]
	>
	extends Map<K, V>
	implements Map<K, V> {
	private _size: number | undefined;

	constructor(private source: T) {
		super();
	}

	clear(): void {
		fluent(this.keys()).forEach((k) => {
			delete this.source[k];
		});
		this._size = 0;
	}

	delete(key: K): boolean {
		const result = this.has(key);
		if (result) {
			const size = this.size;
			this._size = size - 1;
		}

		delete this.source[key];

		return result;
	}

	forEach(
		callbackfn: (value: V, key: K, map: Map<K, V>) => void,
		thisArg: any = this,
	): void {
		return fluent(this.entries()).forEach(([k, v]) =>
			callbackfn(v, k, thisArg),
		);
	}
	get(key: K): V | undefined {
		return this.source[key] as V;
	}
	has(key: K): boolean {
		return this.source[key] !== undefined;
	}
	set(key: K, value: V): this {
		const has = this.has(key);
		this.source[key] = value;
		if (!has) {
			this._size = this.size + 1;
		}
		return this;
	}
	get size(): number {
		if (this._size === undefined) {
			this._size = fluentObject(this.source).count();
		}

		return this._size;
	}

	[Symbol.iterator](): IterableIterator<[K, V]> {
		return getIterableIterator<[K, V]>(() => fluentObject(this.source));
	}
	entries(): IterableIterator<[K, V]> {
		return this[Symbol.iterator]();
	}
	keys(): IterableIterator<K> {
		return getIterableIterator<K>(() => fluent(this.entries()).map('0'));
	}
	values(): IterableIterator<V> {
		return getIterableIterator<V>(() => fluent(this.entries()).map('1'));
	}
}

export function recordMap<T extends Record<any, any> | Map<any, any>>(
	source: T,
): Map<keyof T, T[keyof T]> {
	return source instanceof Map ? source : new RecordMap(source);
}
