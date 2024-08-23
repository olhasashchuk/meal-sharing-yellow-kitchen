import knex from "./database_client.js";

export const getTableSchema = async (tableName) => {
   const columns = await knex(tableName).columnInfo();
   const schema = {};

   for (const columnName in columns) {
      if (columnName.search("id") === false){
         const columnInfo = columns[columnName];
         schema[columnName] = columnInfo.type; 
      }  
   }

   return schema;
};

export const validParam = (data, schema) => {
   for (const key in schema) {
      const expectedType = schema[key];
      const actualValue = data[key];

      let expectedJsType;

      switch (expectedType) {
         case 'integer':
         case 'float':
         case 'decimal':
            expectedJsType = 'number';
            break;
         case 'varchar':
         case 'text':
         case 'char':
         case 'string':
            expectedJsType = 'string';
            break;
         default:
            expectedJsType = 'string'; 
      }

      if (!actualValue || typeof actualValue !== expectedJsType) {
            return `Invalid ${key}`;
         }
   }

   return null;
};
