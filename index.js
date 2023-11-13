
const {google} = require("googleapis");
const {auth} = require("google-auth-library");
var sqladmin = google.sqladmin("v1beta4");
 
exports.exportDatabase = (_req, res) => {
  async function doIt() {
    const authRes = await auth.getApplicationDefault();
    let authClient = authRes.credential;
    var request = {
      // Project ID of the project that contains the instance to be exported.
      project:"kinetic-object-400913",
      // Cloud SQL instance ID. This does not include the project ID.
      instance: "demo-sql-server",
      resource: {
        // Contains details about the export operation.
        exportContext: {
          // This is always sql#exportContext.
          // The file type for the specified uri (e.g. SQL or CSV)
          fileType: "BAK", // CSV
          /**
           * The path to the file in GCS where the export will be stored.
           * The URI is in the form gs://bucketName/fileName.
           * If the file already exists, the operation fails.
           * If fileType is SQL and the filename ends with .gz, the contents are compressed.
           */
          uri: `gs://kinetic-object-400913-sql-backup/backup-${Date.now()}.gz`,
          /**
           * Databases from which the export is made.
           * If fileType is SQL and no database is specified, all databases are exported.
           * If fileType is CSV, you can optionally specify at most one database to export.
           * If csvExportOptions.selectQuery also specifies the database, this field will be ignored.
           */
          databases:["demo-sqlserver"]
   
          // Options for exporting data as SQL statements.
          // sqlExportOptions: {
          //   /**
          //    * Tables to export, or that were exported, from the specified database.
          //    * If you specify tables, specify one and only one database.
          //    */
          //   tables: config.tables,
          //   // Export only schemas?
          //   schemaOnly: config.schemaOnly
          // }
        }
      },
      // Auth client
      auth: authClient
    };
 
    // Kick off export with requested arguments.
    sqladmin.instances.export(request, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
      res.status(200).send("Command completed", err, result);
    });
  }
  doIt();
};
 
