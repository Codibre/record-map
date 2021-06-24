import { recordMap } from '../../src';

describe('index.ts', () => {
	it('should return the source if the source is already a Map', () => {
		const source = new Map();

		const result = recordMap(source);

		expect(result).toBe(source);
	});

	it('should return an instance of Map when source is Record', () => {
		const source = {
			a: 1,
			b: 'b',
			c: true,
		};

		const result = recordMap(source);

		expect(result).toBeInstanceOf(Map);
	});

	it('should return an instance of Map with functional forEach when source is Record', () => {
		const source = {
			a: 1,
			b: 'b',
			c: true,
		};

		const result: unknown[] = [];
		recordMap(source).forEach((v, k) => result.push([k, v]));

		expect(result).toEqual([
			['a', 1],
			['b', 'b'],
			['c', true],
		]);
	});

	it('should return an instance of Map with functional clear when source is Record', () => {
		const source = {
			a: 1,
			b: 'b',
			c: true,
		};

		const result = recordMap(source);
		result.clear();

		expect(result.size).toBe(0);
		expect(source).toEqual({});
	});

	it('should return an instance of Map with functional delete when source is Record', () => {
		const source = {
			a: 1,
			b: 'b',
			c: false,
		};

		const target = recordMap(source);
		const result = target.delete('c');

		expect(result).toBe(true);
		expect(target.size).toBe(2);
		expect(source).toEqual({
			a: 1,
			b: 'b',
		});
	});

	it('should return an instance of Map with functional delete when source is Record and deleted key does not exist', () => {
		const source = {
			a: 1,
			b: 'b',
			c: false,
		};

		const target = recordMap(source);
		const result = target.delete('d' as any);

		expect(result).toBe(false);
		expect(target.size).toBe(3);
		expect(source).toEqual({
			a: 1,
			b: 'b',
			c: false,
		});
	});

	it('should return an instance of Map with functional get when source is Record', () => {
		const source = {
			a: 1,
			b: 'b',
			c: true,
		};

		const target = recordMap(source);
		const result = target.get('c');
		const result2 = target.get('d' as any);

		expect(result).toBe(true);
		expect(result2).toBeUndefined();
		expect(target.size).toBe(3);
	});

	it('should return an instance of Map with functional has when source is Record', () => {
		const source = {
			a: 1,
			b: 'b',
			c: true,
		};

		const target = recordMap(source);
		const result = target.has('c');
		const result2 = target.has('d' as any);

		expect(result).toBe(true);
		expect(result2).toBe(false);
		expect(target.size).toBe(3);
	});

	it('should return an instance of Map with functional set when source is Record', () => {
		const source = {
			a: 1,
			b: 'b',
			c: true,
		};

		const target = recordMap(source);
		const result = target.set('b', 'test');

		expect(result).toBe(target);
		expect(target.get('b')).toBe('test');
		expect(source.b).toBe('test');
		expect(target.size).toBe(3);
	});

	it('should return an instance of Map with functional set when source is Record and an pair is added', () => {
		const source = {
			a: 1,
			b: 'b',
			c: true,
		};

		const target = recordMap(source);
		const oldSize = target.size;
		const result = target.set('d' as any, 'test');

		expect(result).toBe(target);
		expect(target.get('d' as any)).toBe('test');
		expect(source['d' as keyof typeof source]).toBe('test');
		expect(oldSize).toBe(3);
		expect(target.size).toBe(4);
	});

	it('should return an instance of Map with functional IterableIterator when source is Record', () => {
		const source = {
			a: 1,
			b: 'b',
			c: true,
		};

		const target = recordMap(source)[Symbol.iterator]();
		const result: ['b' | 'a' | 'c', string | number | boolean][] = [];
		for (const item of target) {
			result.push(item);
		}
		for (const item of target[Symbol.iterator]()) {
			result.push(item);
		}

		expect(result).toEqual([
			['a', 1],
			['b', 'b'],
			['c', true],
		]);
	});

	it('should return an instance of Map with functional entries when source is Record', () => {
		const source = {
			a: 1,
			b: 'b',
			c: true,
		};

		const target = recordMap(source).entries();
		const result: ['b' | 'a' | 'c', string | number | boolean][] = [];
		for (const item of target) {
			result.push(item);
		}
		for (const item of target[Symbol.iterator]()) {
			result.push(item);
		}

		expect(result).toEqual([
			['a', 1],
			['b', 'b'],
			['c', true],
		]);
	});

	it('should return an instance of Map with functional keys when source is Record', () => {
		const source = {
			a: 1,
			b: 'b',
			c: true,
		};

		const target = recordMap(source).keys();
		const result: ('b' | 'a' | 'c')[] = [];
		for (const item of target) {
			result.push(item);
		}
		for (const item of target[Symbol.iterator]()) {
			result.push(item);
		}

		expect(result).toEqual(['a', 'b', 'c']);
	});

	it('should return an instance of Map with functional values when source is Record', () => {
		const source = {
			a: 1,
			b: 'b',
			c: true,
		};

		const target = recordMap(source).values();
		const result: (string | number | boolean)[] = [];
		for (const item of target) {
			result.push(item);
		}
		for (const item of target[Symbol.iterator]()) {
			result.push(item);
		}

		expect(result).toEqual([1, 'b', true]);
	});
});
