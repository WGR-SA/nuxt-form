import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { NuxtFormField } from "../../src/runtime/utils/models/decorators/FormDecorator" 

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar' })
  firstName: string

  @Column({ type: 'varchar' })
  lastName: string

  @Column({ type: 'int' })
  age: number
}


// type: ColumnType - Column type.One of the type listed above.

//   name: string - Column name in the database table.By default the column name is generated from the name of the property.You can change it by specifying your own name.

//     length: number - Column type's length. For example if you want to create varchar(150) type you specify column type and length options.

// width: number - column type's display width. Used only for MySQL integer types

// onUpdate: string - ON UPDATE trigger.Used only in MySQL.

//   nullable: boolean - Makes column NULL or NOT NULL in the database.By default column is nullable: false.

//     update: boolean - Indicates if column value is updated by "save" operation.If false, you'll be able to write this value only when you first time insert the object. Default value is true.

// insert: boolean - Indicates if column value is set the first time you insert the object.Default value is true.

//   select: boolean - Defines whether or not to hide this column by default when making queries.When set to false, the column data will not show with a standard query.By default column is select: true

// default: string - Adds database - level column's DEFAULT value.

// primary: boolean - Marks column as primary.Same if you use @PrimaryColumn.

//   unique: boolean - Marks column as unique column (creates unique constraint).

// comment: string - Database's column comment. Not supported by all database types.

// precision: number - The precision for a decimal(exact numeric) column(applies only for decimal column), which is the maximum number of digits that are stored for the values.Used in some column types.

//   scale: number - The scale for a decimal(exact numeric) column(applies only for decimal column), which represents the number of digits to the right of the decimal point and must not be greater than precision.Used in some column types.

//     zerofill: boolean - Puts ZEROFILL attribute on to a numeric column.Used only in MySQL.If true, MySQL automatically adds the UNSIGNED attribute to this column.

//       unsigned: boolean - Puts UNSIGNED attribute on to a numeric column.Used only in MySQL.

//         charset: string - Defines a column character set.Not supported by all database types.

//           collation: string - Defines a column collation.

//             enum: string[] | AnyEnum - Used in enum column type to specify list of allowed enum values. You can specify array of values or specify a enum class.

// enumName: string - Defines the name for the used enum.

// asExpression: string - Generated column expression.Used only in MySQL.

//   generatedType: "VIRTUAL" | "STORED" - Generated column type.Used only in MySQL.

//     hstoreType: "object" | "string" - Return type of HSTORE column.Returns value as string or as object.Used only in Postgres.

//       array: boolean - Used for postgres and cockroachdb column types which can be array(for example int[])

//   transformer: { from(value: DatabaseType): EntityType, to(value: EntityType): DatabaseType } - Used to marshal properties of arbitrary type EntityType into a type DatabaseType supported by the database.Array of transformers are also supported and will be applied in natural order when writing, and in reverse order when reading.e.g. [lowercase, encrypt] will first lowercase the string then encrypt it when writing, and will decrypt then do nothing when reading.