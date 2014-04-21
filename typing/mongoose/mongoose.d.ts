/// <reference path="../node/node.d.ts" />

interface ConnectionOptions {
    db?: any;
    server?: any;
    replset?: any;
    user?: string;
    pass?: string;
    auth?: any;
    mongos?: boolean;
}

interface SchemaOptions {
    autoIndex?: boolean;
    bufferCommands?: boolean;
    capped?: any;
    collection?: string;
    id?: boolean;
    _id?: boolean;
    minimize?: boolean;
    read?: any;
    safe?: boolean;
    shardKey?: Object;
    strict?: boolean;
    toJSON?: Object;
    toObject?: Object;
    versionKey?: boolean;
}

interface SchemaTypes {
    String: any;
    Number: any;
    Boolean: any;
    Bool: any;
    Array: any;
    Buffer: any;
    Date: any;
    ObjectId: any;
    Oid: any;
    Mixed: any;
}

interface MongooseTypes {
    Array: any;
    Buffer: any;
    Document: any;
    Embedded: any;
    DocumentArray: any;
    ObjectId: any;
}

interface QueryOptions {
    tailable?: any;
    sort?: any;
    limit?: any;
    skip?: any;
    maxscan?: any;
    batchSize?: any;
    comment?: any;
    snapshot?: any;
    hint?: any;
    slaveOk?: any;
    lean?: any;

    /* mongo cursor options */
    explain?: any;
    timeout?: any;
    awaitdata?: any;
    raw?: any;
    read?: any;
    returnKey?: any;
    maxScan?: any;
    min?: any;
    max?: any;
    showDiskLoc?: any;
    numberOfRetries?: any;
    dbName?: any;
    tailableRetryInterval?: any;
    exhaust?: any;
    partial?: any;
}

interface QueryStream extends ReadableStream {
    readable: boolean;
    paused: boolean;
    pause(): void;
    resume(): void;
    destroy(err?: any): void;
}

declare module "mongoose" {

    class Mongoose {
        constructor();

        mongo: any;
        version: string;
        connection: Connection;

        set(key: string, value: string): Mongoose;
        get(key: string): string;
        createConnection(uri?: string, options?: any): Connection;
        connect(...args: any[]): Mongoose;
        disconnect(fn: (err?: any) => void): Mongoose;
        model(name: string, schema?: Schema, collection?: string, skipInit?: boolean): Model<any>;
        modelNames(): string[];
        plugin(fn: (...args: any[]) => any, opts?: any): Mongoose;
    }

    var mongo: any;
    var version: string;
    var connection: Connection;

    function set(key: string, value: string): Mongoose;
    function get(key: string): string;
    function createConnection(uri?: string, options?: any): Connection;
    function connect(...args: any[]): Mongoose;
    function disconnect(fn: (err?: any) => void): Mongoose;
    function model(name: string, schema?: Object, collection?: string, skipInit?: boolean): Model<any>;
    function modelNames(): string[];
    function plugin(fn: (schema: Schema, options?: Object) => void, opts?: any): Mongoose;

    interface Collection {
        name: string;
    }

    interface Connection extends NodeEventEmitter {
        new (base: Mongoose): Connection;

        open(connection_string: string, database?: string, port?: number, options?: ConnectionOptions, callback?: (err: any, db?: any) => void): Connection;
        openSet(uris: string, database?: string, options?: ConnectionOptions, callback?: (err: any, db?: any) => void): Connection;
        close(callback?: Function): Connection;
        collection(name: string, options?: any): Collection;
        model(name: string, schema?: Schema, collection?: string): Model<any>;
        modelNames(): string[];
        setProfiling(level: number, ms: number, callback: Function): any;

        db: any;
        collections: any;
        readyState: number;
    }

    class Schema {
        constructor(definition: any, options?: SchemaOptions);

        static Types: SchemaTypes;

        methods: any;
        statics: any;

        add(obj: Object, prefix?: string): void;
        path(path: string): SchemaType;
        path(path: string, obj: Object): Schema;
        eachPath(callback: Function): Schema;
        requiredPaths(): string[];
        pathType(path: string): string;
        pre(method: string, callback: Function): Schema;
        post(method: string, callback: Function): Schema;
        plugin(callback: (schema: Schema, options?: Object) => void, opts?: Object): Schema;
        method(name: string, fn: Function): Schema;
        method(name: Object, fn: Function): Schema;
        static(name: string, fn: Function): Schema;
        index(fields: Object, options?: Object): Schema;
        set(key: string): Object;
        set(key: string, value: Object): Schema;
        get(key: string): Object;
        indexTypes: string[];
        indexes(): any[];
        virtual(name: string, options?: Object): VirtualType;
        virtualpath(name: string): VirtualType;
    }

    interface SchemaType {
        default(val: any): any;
        index(options?: Object): SchemaType;
        unique(bool: boolean): SchemaType;
        sparse(bool: boolean): SchemaType;
        set(fn: (val: any, schemaType?: SchemaType) => any): SchemaType;
        get(fn: (val: any, schemaType?: SchemaType) => any): SchemaType;
        validate(obj: RegExp, error?: string): SchemaType;
        validate(obj: (val: any, callback?: (val: boolean) => void) => void, error?: string): SchemaType;
        validate(obj: Object, error?: string): SchemaType;
        required(bool: boolean): SchemaType;
        select(val: boolean): SchemaType;
    }

    interface VirtualType {
        get(fn: () => any): VirtualType;
        set(fn: (val: any) => void): VirtualType;
        applyGetters(value: any, scope: any): any;
        applySetters(value: any, scope: any): any;
    }

    interface Query<T> {
        setOptions(options: QueryOptions): Query<T>;
        exec(operation?: string, callback?: (err: any, res: T[]) => void): Promise;
        exec(callback: (err: any, res: T[]) => any): Promise;
        find(criteria: Object, callback?: Function): Query<T>;
        find(callback: Function): Query<T>;
        cast(model: Model<Document>, obj?: Object): any;
        $where(js: string): Query<T>;
        $where(js: Function): Query<T>;
        where(path?: string, val?: Object): Query<T>;
        equals(val: any): Query<T>;
        or(array: Object[]): Query<T>;
        nor(array: Object[]): Query<T>;
        and(array: Object[]): Query<T>;
        gt(path: string, val: number): Query<T>;
        gt(val: number): Query<T>;
        gte(path: string, val: number): Query<T>;
        gte(val: number): Query<T>;
        lt(path: string, val: number): Query<T>;
        lt(val: number): Query<T>;
        lte(path: string, val: number): Query<T>;
        lte(val: number): Query<T>;
        ne(path: string, val: any): Query<T>;
        ne(val: any): Query<T>;
        in(path: string, val: any): Query<T>;
        in(val: any): Query<T>;
        nin(path: string, val: any): Query<T>;
        nin(val: any): Query<T>;
        all(path: string, val: any): Query<T>;
        all(val: any): Query<T>;
        size(path: string, val: number): Query<T>;
        size(val: number): Query<T>;
        regex(path: string, val: any): Query<T>;
        regex(val: any): Query<T>;
        maxDistance(path: string, val: number): Query<T>;
        maxDistance(val: number): Query<T>;
        near(path: string, ...val: number[]): Query<T>;
        near(val: number): Query<T>;
        nearSphere(path: string, ...val: number[]): Query<T>;
        nearSphere(val: number): Query<T>;
        mod(path: string, val: number[]): Query<T>;
        mod(path: string, ...val: number[]): Query<T>;
        mod(val: number[]): Query<T>;
        mod(...val: number[]): Query<T>;
        exists(path: string, val?: boolean): Query<T>;
        exists(val?: boolean): Query<T>;
        elemMatch(path: string, val: any): Query<T>;
        elemMatch(val: any): Query<T>;
        intersects: Query<T>;
        select(arg: Object): Query<T>;
        select(arg: string): Query<T>;
        slice(path: string, val: number): Query<T>;
        slice(...val: number[]): Query<T>;
        slice(val: number[]): Query<T>;
        sort(arg: Object): Query<T>;
        sort(arg: String): Query<T>;
        limit(val: number): Query<T>;
        skip(val: number): Query<T>;
        maxscan(val: number): Query<T>;
        batchSize(val: number): Query<T>;
        comment(val: number): Query<T>;
        snapShot(): Query<T>;
        hint(val: Object): Query<T>;
        slaveOk(v?: boolean): Query<T>;
        read(pref: string, tags?: Object[]): Query<T>;
        lean(v?: boolean): Query<T>;
        tailable(v?: boolean): Query<T>;
        findOne(callback: (err: any, result: any) => void): Query<T>;
        count(callback: (err: any, result: number) => void): Query<T>;
        distinct(field: string, callback: (err: any, result: any[]) => void): Query<T>;
        update(doc: Object, callback?: (err: any, numberAffected?: number, raw?: any) => void): Query<T>;
        remove(callback?: (err: any) => void): Query<T>;
        findOneAndUpdate(query: Object, doc: Object, options: Object, callback?: (err: any, doc: any) => void): QueryOne<T>;
        findOneAndUpdate(query: Object, doc: Object, callback?: (err: any, doc: any) => void): QueryOne<T>;
        findOneAndUpdate(callback?: (err: any, doc: any) => void): QueryOne<T>;
        findOneAndRemove(query: Object, options: Object, callback?: (err: any) => void): QueryOne<T>;
        findOneAndRemove(query: Object, callback?: (err: any) => void): QueryOne<T>;
        findOneAndRemove(callback?: (err: any) => void): QueryOne<T>;
        populate(path: string, select?: Object, model?: Model<Document>, match?: Object, options?: Object): Query<T>;
        populate(path: string, select?: string, model?: Model<Document>, match?: Object, options?: Object): Query<T>;
        populate(args: Object): Query<T>;

        stream(): QueryStream;
        within: QueryWithin<T>;
    }

    interface QueryOne<T> {
        setOptions(options: QueryOptions): QueryOne<T>;
        exec(operation?: string, callback?: (err: any, res: T) => void): Promise;
        exec(callback: (err: any, res: T) => any): Promise;
        find(criteria: Object, callback?: Function): Query<T>;
        find(callback: Function): Query<T>;
        cast(model: Model<Document>, obj?: Object): any;
        $where(js: string): QueryOne<T>;
        $where(js: Function): QueryOne<T>;
        where(path?: string, val?: Object): QueryOne<T>;
        equals(val: any): QueryOne<T>;
        or(array: Object[]): QueryOne<T>;
        nor(array: Object[]): QueryOne<T>;
        and(array: Object[]): QueryOne<T>;
        gt(path: string, val: number): QueryOne<T>;
        gt(val: number): QueryOne<T>;
        gte(path: string, val: number): QueryOne<T>;
        gte(val: number): QueryOne<T>;
        lt(path: string, val: number): QueryOne<T>;
        lt(val: number): QueryOne<T>;
        lte(path: string, val: number): QueryOne<T>;
        lte(val: number): QueryOne<T>;
        ne(path: string, val: any): QueryOne<T>;
        ne(val: any): QueryOne<T>;
        in(path: string, val: any): QueryOne<T>;
        in(val: any): QueryOne<T>;
        nin(path: string, val: any): QueryOne<T>;
        nin(val: any): QueryOne<T>;
        all(path: string, val: any): QueryOne<T>;
        all(val: any): QueryOne<T>;
        size(path: string, val: number): QueryOne<T>;
        size(val: number): QueryOne<T>;
        regex(path: string, val: any): QueryOne<T>;
        regex(val: any): QueryOne<T>;
        maxDistance(path: string, val: number): QueryOne<T>;
        maxDistance(val: number): QueryOne<T>;
        near(path: string, ...val: number[]): QueryOne<T>;
        near(val: number): QueryOne<T>;
        nearSphere(path: string, ...val: number[]): QueryOne<T>;
        nearSphere(val: number): QueryOne<T>;
        mod(path: string, val: number[]): QueryOne<T>;
        mod(path: string, ...val: number[]): QueryOne<T>;
        mod(val: number[]): QueryOne<T>;
        mod(...val: number[]): QueryOne<T>;
        exists(path: string, val?: boolean): QueryOne<T>;
        exists(val?: boolean): QueryOne<T>;
        elemMatch(path: string, val: any): QueryOne<T>;
        elemMatch(val: any): QueryOne<T>;
        intersects: QueryOne<T>;
        select(arg: Object): QueryOne<T>;
        select(arg: string): QueryOne<T>;
        slice(path: string, val: number): QueryOne<T>;
        slice(...val: number[]): QueryOne<T>;
        slice(val: number[]): QueryOne<T>;
        sort(arg: Object): QueryOne<T>;
        sort(arg: String): QueryOne<T>;
        limit(val: number): QueryOne<T>;
        skip(val: number): QueryOne<T>;
        maxscan(val: number): QueryOne<T>;
        batchSize(val: number): QueryOne<T>;
        comment(val: number): QueryOne<T>;
        snapShot(): QueryOne<T>;
        hint(val: Object): QueryOne<T>;
        slaveOk(v?: boolean): QueryOne<T>;
        read(pref: string, tags?: Object[]): QueryOne<T>;
        lean(v?: boolean): QueryOne<T>;
        tailable(v?: boolean): QueryOne<T>;
        findOne(callback: (err: any, result: any) => void): QueryOne<T>;
        count(callback: (err: any, result: number) => void): QueryOne<T>;
        distinct(field: string, callback: (err: any, result: any[]) => void): QueryOne<T>;
        update(doc: Object, callback?: (err: any, numberAffected?: number, raw?: any) => void): QueryOne<T>;
        remove(callback?: (err: any) => void): QueryOne<T>;
        findOneAndUpdate(query: Object, doc: Object, options: Object, callback?: (err: any, doc: any) => void): QueryOne<T>;
        findOneAndUpdate(query: Object, doc: Object, callback?: (err: any, doc: any) => void): QueryOne<T>;
        findOneAndUpdate(callback?: (err: any, doc: any) => void): QueryOne<T>;
        findOneAndRemove(query: Object, options: Object, callback?: (err: any) => void): QueryOne<T>;
        findOneAndRemove(query: Object, callback?: (err: any) => void): QueryOne<T>;
        findOneAndRemove(callback?: (err: any) => void): QueryOne<T>;
        populate(path: string, select?: Object, model?: Model<Document>, match?: Object, options?: Object): QueryOne<T>;
        populate(path: string, select?: string, model?: Model<Document>, match?: Object, options?: Object): QueryOne<T>;
        populate(args: Object): QueryOne<T>;

        stream(): QueryStream;
        within: QueryWithin<T>;
    }

    interface QueryWithin<T> extends Query<T> {
        box(path: string, val: Object): QueryWithin<T>;
        box(val: Object): QueryWithin<T>;
        center(path: string, val: Object, opts?: Object): QueryWithin<T>;
        center(val: Object, opts?: Object): QueryWithin<T>;
        centerSphere(path: string, val: Object): QueryWithin<T>;
        centerSphere(val: Object): QueryWithin<T>;
        polygon(path: string, val: any[]): QueryWithin<T>;
        polygon(val: any[]): QueryWithin<T>;
        polygon(path: string, val: Object): QueryWithin<T>;
        polygon(val: Object): QueryWithin<T>;
        geometry(path: string, val: Object): QueryWithin<T>;
        geometry(val: Object): QueryWithin<T>;
    }

    interface QueryOneWithin<T> extends QueryOne<T> {
        box(path: string, val: Object): QueryOneWithin<T>;
        box(val: Object): QueryOneWithin<T>;
        center(path: string, val: Object, opts?: Object): QueryOneWithin<T>;
        center(val: Object, opts?: Object): QueryOneWithin<T>;
        centerSphere(path: string, val: Object): QueryOneWithin<T>;
        centerSphere(val: Object): QueryOneWithin<T>;
        polygon(path: string, val: any[]): QueryOneWithin<T>;
        polygon(val: any[]): QueryOneWithin<T>;
        polygon(path: string, val: Object): QueryOneWithin<T>;
        polygon(val: Object): QueryOneWithin<T>;
        geometry(path: string, val: Object): QueryOneWithin<T>;
        geometry(val: Object): QueryOneWithin<T>;
    }

    interface Promise {
        on(event: string, listener: Function): Promise;
        reject(reason: any): Promise;
        error(err: any): Promise;
        resolve(err?: any, val?: Object): void;
        addBack(listener: Function): Promise;
        complete(...args: any[]): void;
        addCallback(listener: Function): Promise;
        addErrback(listener: Function): Promise;
        then(onFulfill: Function, onReject?: Function): Promise;
        end(): void;
    }

    interface Model<T extends Document> {
        new (doc?: any): T;
        db: any;
        collection: Collection;
        modelName: string;
        schema: Schema;
        base: Mongoose;

        find(conditions: any, fields?: any, options?: any, callback?: (err: any, res: any) => void): Query<T>;
        find(conditions: any, fields: any, callback: (err: any, res: T[]) => void): Query<T>;
        find(conditions: any, callback: (err: any, res: T[]) => void): Query<T>;

        findOne(conditions: any, fields?: any, options?: any, callback?: (err: any, res: T) => void): QueryOne<T>;
        findOne(conditions: any, fields: any, callback: (err: any, res: T) => void): QueryOne<T>;
        findOne(conditions: any, callback: (err: any, res: T) => void): QueryOne<T>;

        findById(id: string, fields?: any, options?: any, callback?: (err: any, res: T) => void): QueryOne<T>;
        findById(id: string, fields: any, callback: (err: any, res: T) => void): QueryOne<T>;
        findById(id: string, callback: (err: any, res: T) => void): QueryOne<T>;

        findByIdAndUpdate(id: string, update: any, options?: any, callback?: (err: any, res: T) => void): QueryOne<T>;
        findByIdAndUpdate(id: string, update: any, callback: (err: any, res: T) => void): QueryOne<T>;

        findByIdAndRemove(id: any, options?: Object, callback?: (err: any, numberOfRemovedDocs?: number) => void): QueryOne<number>;
        findByIdAndRemove(id: any, callback: (err: any, numberOfRemovedDocs?: number) => void): QueryOne<number>;

        findOneAndUpdate(conditions?: Object, update?: Object, options?: Object, callback?: (err: any, doc?: any) => void): QueryOne<any>;
        findOneAndUpdate(conditions: Object, update: Object, callback: (err: any, doc?: any) => void): QueryOne<any>;

        findOneAndRemove(conditions: Object, options?: Object, callback?: (err: any, doc?: any) => void): QueryOne<any>;
        findOneAndRemove(conditions: Object, callback: (err: any, doc?: any) => void): QueryOne<any>;

        update(conditions: Object, update: Object, options?: Object, callback?: (err: any, affectedRows?: number, raw?: any) => void): QueryOne<number>;
        update(conditions: Object, update: Object, callback: (err: any, affectedRows?: number, raw?: any) => void): QueryOne<number>;

        distinct(field: string, conditions?: Object, callback?: (err: any, result: any) => void): Query<T>;
        distinct(field: string, callback: (err: any, result: any) => void): Query<T>;

        where(path: string, val?: Object): Query<T>;
        $where(argument: string): Query<T>;
        $where(argument: (err: any, docs: any) => void): Query<T>;

        aggregate(array: Object[], options?: Object, callback?: (err: any, res: any) => void): any;
        aggregate(array: Object[], callback: (err: any, res: any) => void): any;

        populate(doc: Object, options: Object, callback: (err: any, doc: any) => void): void;
        populate(docs: Object[], options: Object, callback: (err: any, docs: Object[]) => void): void;

        create(doc: any, fn: (err: any, res: T) => void): void;
        remove(conditions: any, callback?: (err: any) => void): QueryOne<any>;
        increment(): Model<T>;
        ensureIndexes(cb?: (err: any) => void): void;
        count(conditions?: Object, callback?: (err: any, count: number) => void): QueryOne<number>;
        mapReduce(o: Object, callback: (err: any, model: Model<T>, stats: any) => void): void;
    }

    interface Document {
        schema: Schema;
        isNew: boolean;
        id: string;
        errors: Object;

        update<T extends Document>(update: Object, options?: Object, callback?: (err: any, affectedRows?: number, raw?: any) => void): QueryOne<number>;
        update<T extends Document>(update: Object, callback: (err: any, affectedRows?: number, raw?: any) => void): QueryOne<number>;

        save<T extends Document>(callback?: (err: any, res?: T) => void): QueryOne<T>;
        remove<T extends Document>(callback?: (err: any) => void): QueryOne<any>;

        set(path: any, val: any, type?: SchemaTypes, options?: Object): Document;
        set(path: any, val: any, options: Object): Document;

        get(path: string, type?: SchemaTypes): any;
        markModified(path: string): void;
        modifiedPaths(): string[];
        isModified(path?: string): boolean;
        isDirectModified(path: string): boolean;
        isInit(path: string): boolean;
        isSelected(path: string): boolean;
        validate(cb: (err: any) => void): Document;
        invalidate(path: string, err: any, value?: any): void;
        toObject(options?: Object): any;
        toJSON(options?: Object): any;
        inspect(options?: Object): any;
        toString(): string;
        equals(doc: Document): boolean;

        populate(path?: string, callback?: (err: any, doc: any) => void): Document;
        populate(options: Object, callback?: (err: any, doc: any) => void): Document;

        populated(path: string): any;
    }

    interface MongooseError extends Error { }
    interface CastError extends MongooseError { }
    interface DocumentError extends MongooseError { }
    interface ValidationError extends MongooseError {
        errors: MongooseError[];
    }
    interface ValidatorError extends MongooseError { }
    interface VersionError extends MongooseError { }
    interface OverwriteModelError extends MongooseError { }
    interface MissingSchemaError extends MongooseError { }
    interface DivergentArrayError extends MongooseError { }

    var Error: {
        new (message?: string): MongooseError;

        CastError: {
            new (type: any, value: any, path: string): CastError;
        }
    DocumentError: {
            new (message?: string): DocumentError;
        }
    ValidationError: {
            new (instance: Object): ValidationError;
        }
    ValidatorError: {
            new (path: string, msg?: string, val?: any): ValidatorError;
        }
    VersionError: {
            new (): VersionError;
        }
    OverwriteModelError: {
            new (name: string): OverwriteModelError;
        }
    MissingSchemaError: {
            new (name: string): MissingSchemaError;
        }
    DivergentArrayError: {
            new (paths: string[]): DivergentArrayError;
        }
    }

  var Types: MongooseTypes;
    var SchemaTypes: SchemaTypes;
}