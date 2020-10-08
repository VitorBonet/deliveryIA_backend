import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateVertexGrafo1600385863265
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vertexGrafo',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'itemGrafo_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'itemGrafo_second_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'value',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'vertexGrafo',
      new TableForeignKey({
        name: 'vertexItemGrafo',
        columnNames: ['itemGrafo_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'itemGrafo',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'vertexGrafo',
      new TableForeignKey({
        name: 'vertexGrafo_second',
        columnNames: ['itemGrafo_second_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'itemGrafo',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('vertexGrafo', 'vertexGrafo_second');

    await queryRunner.dropForeignKey('vertexGrafo', 'vertexItemGrafo');

    await queryRunner.dropTable('vertexGrafo');
  }
}
