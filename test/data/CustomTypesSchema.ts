export default [
    {
        type: 'object',
        properties: {
            bool: {
                type: 'boolean',
            },
            bool2: {
                type: 'boolean',
                enum: [true],
            },
            bool3: {
                type: 'boolean',
                enum: [false],
            },
            bool4: {
                enum: [false],
                type: 'boolean',
            },
            string1: {
                type: 'string',
                enum: ['astring'],
            },
            string2: {
                type: 'string',
            },
            string3: {
                type: 'string',
            },
            num: {
                type: 'number',
            },
            num2: {
                $ref: '#/definitions/Number',
            },
            num3: {
                type: 'number',
            },
            num4: {
                enum: [2],
                type: 'number',
            },
            itself: {
                $ref: '#/definitions/CustomResponse',
            },
            itself2: {
                $ref: '#/definitions/CustomResponse',
            },
            obj: {
                type: 'object',
                properties: {
                    _bool: {
                        type: 'boolean',
                    },
                    _bool2: {
                        type: 'boolean',
                        enum: [true],
                    },
                    _bool3: {
                        type: 'boolean',
                        enum: [false],
                    },
                    _bool4: {
                        enum: [false],
                        type: 'boolean',
                    },
                    _string1: {
                        type: 'string',
                        enum: ['astring'],
                    },
                    _string2: {
                        type: 'string',
                    },
                    _string3: {
                        type: 'string',
                    },
                    obj: {
                        type: 'object',
                        properties: {
                            __bool: {
                                type: 'boolean',
                            },
                            __bool2: {
                                type: 'boolean',
                                enum: [true],
                            },
                            __bool3: {
                                type: 'boolean',
                                enum: [false],
                            },
                            __bool4: {
                                enum: [false],
                                type: 'boolean',
                            },
                            __string1: {
                                type: 'string',
                                enum: ['astring'],
                            },
                            __string2: {
                                type: 'string',
                            },
                            __string3: {
                                type: 'string',
                            },
                        },
                        additionalProperties: false,
                        required: ['__bool', '__bool2', '__bool3', '__string1', '__string2'],
                    },
                },
                additionalProperties: false,
                required: ['_bool', '_bool2', '_bool3', '_string1', '_string2', 'obj'],
            },
            obj2: {
                type: 'object',
                properties: {},
            },
            obj3: {
                type: 'object',
                properties: {
                    ___v1: {
                        type: 'number',
                        enum: [1],
                    },
                },
                additionalProperties: false,
                required: ['___v1'],
            },
        },
        additionalProperties: false,
        required: ['bool', 'bool2', 'bool3', 'itself', 'num', 'num2', 'obj', 'obj2', 'obj3', 'string1', 'string2'],
        definitions: {
            Number: {
                description:
                    'An object that represents a number of any kind. All JavaScript numbers are 64-bit floating-point numbers.',
                type: 'object',
                additionalProperties: false,
            },
            CustomResponse: {
                type: 'object',
                properties: {
                    bool: {
                        type: 'boolean',
                    },
                    bool2: {
                        type: 'boolean',
                        enum: [true],
                    },
                    bool3: {
                        type: 'boolean',
                        enum: [false],
                    },
                    bool4: {
                        enum: [false],
                        type: 'boolean',
                    },
                    string1: {
                        type: 'string',
                        enum: ['astring'],
                    },
                    string2: {
                        type: 'string',
                    },
                    string3: {
                        type: 'string',
                    },
                    num: {
                        type: 'number',
                    },
                    num2: {
                        $ref: '#/definitions/Number',
                    },
                    num3: {
                        type: 'number',
                    },
                    num4: {
                        enum: [2],
                        type: 'number',
                    },
                    itself: {
                        $ref: '#/definitions/CustomResponse',
                    },
                    itself2: {
                        $ref: '#/definitions/CustomResponse',
                    },
                    obj: {
                        type: 'object',
                        properties: {
                            _bool: {
                                type: 'boolean',
                            },
                            _bool2: {
                                type: 'boolean',
                                enum: [true],
                            },
                            _bool3: {
                                type: 'boolean',
                                enum: [false],
                            },
                            _bool4: {
                                enum: [false],
                                type: 'boolean',
                            },
                            _string1: {
                                type: 'string',
                                enum: ['astring'],
                            },
                            _string2: {
                                type: 'string',
                            },
                            _string3: {
                                type: 'string',
                            },
                            obj: {
                                type: 'object',
                                properties: {
                                    __bool: {
                                        type: 'boolean',
                                    },
                                    __bool2: {
                                        type: 'boolean',
                                        enum: [true],
                                    },
                                    __bool3: {
                                        type: 'boolean',
                                        enum: [false],
                                    },
                                    __bool4: {
                                        enum: [false],
                                        type: 'boolean',
                                    },
                                    __string1: {
                                        type: 'string',
                                        enum: ['astring'],
                                    },
                                    __string2: {
                                        type: 'string',
                                    },
                                    __string3: {
                                        type: 'string',
                                    },
                                },
                                additionalProperties: false,
                                required: ['__bool', '__bool2', '__bool3', '__string1', '__string2'],
                            },
                        },
                        additionalProperties: false,
                        required: ['_bool', '_bool2', '_bool3', '_string1', '_string2', 'obj'],
                    },
                    obj2: {
                        type: 'object',
                        properties: {},
                    },
                    obj3: {
                        type: 'object',
                        properties: {
                            ___v1: {
                                type: 'number',
                                enum: [1],
                            },
                        },
                        additionalProperties: false,
                        required: ['___v1'],
                    },
                },
                additionalProperties: false,
                required: [
                    'bool',
                    'bool2',
                    'bool3',
                    'itself',
                    'num',
                    'num2',
                    'obj',
                    'obj2',
                    'obj3',
                    'string1',
                    'string2',
                ],
            },
        },
        $schema: 'http://json-schema.org/draft-07/schema#',
    },
    {
        type: 'object',
        properties: {
            num: {
                type: 'number',
            },
            message: {
                type: 'string',
            },
        },
        additionalProperties: false,
        required: ['message', 'num'],
        definitions: {
            Number: {
                description:
                    'An object that represents a number of any kind. All JavaScript numbers are 64-bit floating-point numbers.',
                type: 'object',
                additionalProperties: false,
            },
            CustomResponse: {
                type: 'object',
                properties: {
                    bool: {
                        type: 'boolean',
                    },
                    bool2: {
                        type: 'boolean',
                        enum: [true],
                    },
                    bool3: {
                        type: 'boolean',
                        enum: [false],
                    },
                    bool4: {
                        enum: [false],
                        type: 'boolean',
                    },
                    string1: {
                        type: 'string',
                        enum: ['astring'],
                    },
                    string2: {
                        type: 'string',
                    },
                    string3: {
                        type: 'string',
                    },
                    num: {
                        type: 'number',
                    },
                    num2: {
                        $ref: '#/definitions/Number',
                    },
                    num3: {
                        type: 'number',
                    },
                    num4: {
                        enum: [2],
                        type: 'number',
                    },
                    itself: {
                        $ref: '#/definitions/CustomResponse',
                    },
                    itself2: {
                        $ref: '#/definitions/CustomResponse',
                    },
                    obj: {
                        type: 'object',
                        properties: {
                            _bool: {
                                type: 'boolean',
                            },
                            _bool2: {
                                type: 'boolean',
                                enum: [true],
                            },
                            _bool3: {
                                type: 'boolean',
                                enum: [false],
                            },
                            _bool4: {
                                enum: [false],
                                type: 'boolean',
                            },
                            _string1: {
                                type: 'string',
                                enum: ['astring'],
                            },
                            _string2: {
                                type: 'string',
                            },
                            _string3: {
                                type: 'string',
                            },
                            obj: {
                                type: 'object',
                                properties: {
                                    __bool: {
                                        type: 'boolean',
                                    },
                                    __bool2: {
                                        type: 'boolean',
                                        enum: [true],
                                    },
                                    __bool3: {
                                        type: 'boolean',
                                        enum: [false],
                                    },
                                    __bool4: {
                                        enum: [false],
                                        type: 'boolean',
                                    },
                                    __string1: {
                                        type: 'string',
                                        enum: ['astring'],
                                    },
                                    __string2: {
                                        type: 'string',
                                    },
                                    __string3: {
                                        type: 'string',
                                    },
                                },
                                additionalProperties: false,
                                required: ['__bool', '__bool2', '__bool3', '__string1', '__string2'],
                            },
                        },
                        additionalProperties: false,
                        required: ['_bool', '_bool2', '_bool3', '_string1', '_string2', 'obj'],
                    },
                    obj2: {
                        type: 'object',
                        properties: {},
                    },
                    obj3: {
                        type: 'object',
                        properties: {
                            ___v1: {
                                type: 'number',
                                enum: [1],
                            },
                        },
                        additionalProperties: false,
                        required: ['___v1'],
                    },
                },
                additionalProperties: false,
                required: [
                    'bool',
                    'bool2',
                    'bool3',
                    'itself',
                    'num',
                    'num2',
                    'obj',
                    'obj2',
                    'obj3',
                    'string1',
                    'string2',
                ],
            },
        },
        $schema: 'http://json-schema.org/draft-07/schema#',
    },
];
