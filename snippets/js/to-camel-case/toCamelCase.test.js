import { jest } from '@jest/globals';
import toCamelCase from './toCamelCase';

describe('for string inputs', () => {
    const input = "lorem ipsum dolor sit amet";

    test('it translates the string to camel case', () => {
        const expected = "loremIpsumDolorSitAmet";
        const actual = toCamelCase(input);
        expect(actual).toEqual(expected);
    });
});

describe('for non-string, non-array and non-object inputs', () => {
    test.each([
        { type: 'number', input: 1.2345 },
        { type: 'boolean', input: false },
        { type: 'null', input: null },
        { type: 'undefined', input: undefined }
    ])(`it returns $type inputs as they are`, ({ type, input }) => {
        const actual = toCamelCase(input);
        expect(actual).toEqual(input);
    });
});

describe('for object inputs', () => {
    // NOTE: this first test is added as a reminder - there is no need for explict
    //       key-type handling in the function since object keys are always strings
    test('valid javascript object keys are always strings under the hood', () => {
        const input = {
            1: "A",
            2: "B",
            true: "C",
            ['asdf']: "D"
        };

        const expected = ['string', 'string', 'string', 'string'];
        const actual = Object.keys(input).map(k => typeof (k));
        expect(actual).toEqual(expected);
    });

    describe('when the object is empty', () => {
        const input = {};

        test('it returns an empty object', () => {
            const expected = {};
            const actual = toCamelCase(input);
            expect(actual).toEqual(expected);
        });
    });

    describe('when the object has PascalCase keys', () => {
        const input = {
            "Id": 555,
            "Name": "Testy McTest",
            "PlaceOfBirth": "Testville"
        };

        test('it returns a matching camel-cased object', () => {
            const expected = {
                "id": 555,
                "name": "Testy McTest",
                "placeOfBirth": "Testville"
            };

            const actual = toCamelCase(input);
            expect(actual).toEqual(expected);
        });
    });

    describe('when the object has kebab-case keys', () => {
        const input = {
            "id": 555,
            "name": "Testy McTest",
            "place-of-birth": "Testville"
        };

        test('it returns a matching camel-cased object', () => {
            const expected = {
                "id": 555,
                "name": "Testy McTest",
                "placeOfBirth": "Testville"
            };

            const actual = toCamelCase(input);
            expect(actual).toEqual(expected);
        });
    });

    describe('when the object has snake_case keys', () => {
        const input = {
            "id": 555,
            "name": "Testy McTest",
            "place_of_birth": "Testville"
        };

        test('it returns a matching camel-cased object', () => {
            const expected = {
                "id": 555,
                "name": "Testy McTest",
                "placeOfBirth": "Testville"
            };

            const actual = toCamelCase(input);
            expect(actual).toEqual(expected);
        });
    });

    describe(`when the object has 'spaced text' keys`, () => {
        const input = {
            "id": 555,
            "name": "Testy McTest",
            "place of birth": "Testville"
        };

        test('it returns a matching camel-cased object', () => {
            const expected = {
                "id": 555,
                "name": "Testy McTest",
                "placeOfBirth": "Testville"
            };

            const actual = toCamelCase(input);
            expect(actual).toEqual(expected);
        });
    });

    describe('when non-camel-case keys exist throughout a deep object graph', () => {
        const input = {
            "FirstNode": {
                "nested-group-A": {
                    "nested group_A-1": {
                        "A": "a",
                        "B": "b",
                        "C": "c"
                    }
                }
            },
            "Second node": {
                "nested_group_B": {
                    "nestedGroupB2": {
                        "1": 1,
                        "2": 2,
                        "3": 3
                    }
                }
            }
        };

        test('it returns a correctly camel-cased object', () => {
            const expected = {
                "firstNode": {
                    "nestedGroupA": {
                        "nestedGroupA1": {
                            "a": "a",
                            "b": "b",
                            "c": "c"
                        }
                    }
                },
                "secondNode": {
                    "nestedGroupB": {
                        "nestedGroupB2": {
                            "1": 1,
                            "2": 2,
                            "3": 3
                        }
                    }
                }
            };

            const actual = toCamelCase(input);
            expect(actual).toEqual(expected);
        });
    });
});

describe('for array inputs', () => {
    describe('when the array is empty', () => {
        const input = [];

        test('it returns an empty array', () => {
            const expected = [];
            const actual = toCamelCase(input);
            expect(actual).toEqual(expected);
        });
    });

    describe('when the array contains nested arrays', () => {
        const input = [
            [
                [1, 2, 3, 4, ['a', 'b', 'c']]
            ]
        ];

        test('it returns a result that maintains the same nesting structure', () => {
            const expected = [
                [
                    [1, 2, 3, 4, ['a', 'b', 'c']]
                ]
            ];
            const actual = toCamelCase(input);
            expect(actual).toEqual(expected);
        });
    });

    describe('when the array contains non-camel-cased objects', () => {
        const input = [
            {
                "FirstKey": 1,
                "second-key": {
                    "third_key": {
                        "Fourth Key": 'a'
                    }
                }
            },
            {
                "FirstKey": 2,
                "second-key": {
                    "third_key": {
                        "Fourth Key": 'b'
                    }
                }
            }
        ];

        test('it returns a matching array with correctly camel-cased objects', () => {
            const expected = [
                {
                    "firstKey": 1,
                    "secondKey": {
                        "thirdKey": {
                            "fourthKey": 'a'
                        }
                    }
                },
                {
                    "firstKey": 2,
                    "secondKey": {
                        "thirdKey": {
                            "fourthKey": 'b'
                        }
                    }
                },
            ];

            const actual = toCamelCase(input);
            expect(actual).toEqual(expected);
        });
    });

    describe('when the array contains a deeply nested object', () => {
        const input = [
            [
                [
                    { "FirstKey": 1, "second-key": 2, "third_key": 3, "fourth key": 4 }
                ]
            ]
        ];

        test('it returns a matching array structure with a correctly camel-cased object in position', () => {
            const expected = [
                [
                    [
                        { "firstKey": 1, "secondKey": 2, "thirdKey": 3, "fourthKey": 4 }
                    ]
                ]
            ];

            const actual = toCamelCase(input);
            expect(actual).toEqual(expected);
        });
    });
});
