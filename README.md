# sequelize-query-adapter
URL Params mapper to Sequelize Query

## steps
1. Run `npm install --save git+https://github.com/rowiRedFulcrum/sequelize-query-adapter.git#master`
2. Import it on the controller or route 
      ```
        const QueryAdapter = require('sequelize-query-adapter')
        const mainAdapter = new QueryAdapter()
      ```
3. Use adapter to pass the URL query params to the mapper function
    ```
      var query = mainAdapter.sequelMapper(req.query)
    ```

4. Pass the generated query to the sequelize builder
    ```
      return Model.findAll({
        ...query
      })
    ```
##### Notes
 - Can also add other sequelize query together with the generated query, something like 
    ```
      var query = mainAdapter.sequelMapper(req.query)
      return Model.findAll({
        ...query,
        include: [{
          model: Classroom,
          as: 'classroom'
        }]
      })
    ```

## client implementation
 - Where (supports $eq,$like,$gte,$lte)
    ```
      http://localhost:3000/api/student?where[id][$eq]=10
      http://localhost:3000/api/student?where[createdAt][$gte]=2020-11-21
    ```

 - Sort 
     ```
      http://localhost:3000/api/student?sort[student_name]=ASC&sort[createdAt]=DESC
     ```
 - Pagination (limit and offset)
      ```
        http://localhost:3000/api/student?offset=0&limit=10
      ```

  - Chained query sample: 
        ```http://localhost:3000/api/student?offset=0&limit=10&where[createdAt][$lte]=2020-11-25&where[createdAt][$gte]=2020-11-21&where[$classroom.class_name$][$eq]=Section                C&sort[student_name]=ASC
        ```

##### Notes
 - Can also find field name from a join table, just add `$` between the field name
    ```
      http://localhost:3000/api/student?where[$classroom.class_name$][$eq]=Test
    ```
    >[$classroom.class_name$]
    
  
