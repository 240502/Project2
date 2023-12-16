using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
namespace DataAccess.Helper
{
    public class DataHelper
    {
        string ConnectString = @"Data Source =LAPTOP-C3HMM5D6\SQLEXPRESS;Initial Catalog = TestOnline__Demo; Integrated Security = True";
        SqlConnection connection;
        public DataHelper()
        {
            connection = new SqlConnection(ConnectString);

        }
        public DataHelper(string con)
        {
            this.ConnectString = con;
            connection = new SqlConnection(ConnectString);
        }

        public bool Open()
        {
            try
            {
                if (connection.State != ConnectionState.Open)
                {
                    connection.Open();
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }
        public void Close()
        {
            if (connection.State != ConnectionState.Closed)
                connection.Close();
        }
        public DataTable ExcuteReader(string ProcedureName, params object[] param)
        {
            DataTable tb = new DataTable();
            try
            {
                SqlCommand command = new SqlCommand { CommandType = CommandType.StoredProcedure, CommandText = ProcedureName };
                Open();
                command.Connection = connection;
                int paramInput = (param.Length) / 2;
                for (int i = 0; i < paramInput; i++)
                {
                    string paramName = (string)param[i];
                    object paramValue = param[i + paramInput];
                    if (paramName.ToLower().Contains("json"))
                    {
                        command.Parameters.Add(new SqlParameter
                        {
                            ParameterName = paramName,
                            Value = paramValue ?? DBNull.Value,
                            SqlDbType = SqlDbType.NVarChar
                        });
                    }
                    else { command.Parameters.Add(new SqlParameter(paramName, paramValue ?? DBNull.Value)); }
                }
                SqlDataAdapter adapter = new SqlDataAdapter(command);
                adapter.Fill(tb);
                command.Dispose();
                adapter.Dispose();
                connection.Dispose();

            } catch (Exception ex)
            {
                tb = null;

            }
            finally
            {
                Close();
            }
            return tb;
        }

        public int ExcuteNonQuery(string ProcedureName, params object[] param)
        {
            int result = 0;
            try
            {
                SqlCommand command = new SqlCommand{ CommandType = CommandType.StoredProcedure,CommandText = ProcedureName};
                Open();
                command.Connection = connection;
                int paramInput = (param.Length) / 2;
                for (int i = 0; i < paramInput; i++)
                {
                    string paramName = (string)param[i];
                    object paramValue = param[i+paramInput];
                    if (paramName.ToLower().Contains("json"))
                    {
                        command.Parameters.Add(new SqlParameter { ParameterName = paramName, SqlDbType = SqlDbType.NVarChar, Value = paramValue ?? DBNull.Value });
                    }
                    else
                    {
                        command.Parameters.Add(new SqlParameter(paramName,paramValue??DBNull.Value));
                    }
                }
                result =command.ExecuteNonQuery();
                command.Dispose();
                connection.Dispose();
            }
            catch (Exception ex)
            {
                result= -1;
            }
            finally
            {
                Close();
            }
            return result;
        }
    }
}
