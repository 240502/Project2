using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Ứng_dụng_thi_trực_tuyến_khoa_CNTT
{
    public partial class FrmQL_LopHC : Form
    {
        public FrmQL_LopHC()
        {
            InitializeComponent();
        }

        private void label2_Click(object sender, EventArgs e)
        {

        }
        void CloseForm()
        {
            DialogResult result = MessageBox.Show("Bạn chắc chắn muốn thoát?", "Thông báo", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
            if (result == DialogResult.Yes)
            {
                this.Close();
            }
        }

        private void label4_Click(object sender, EventArgs e)
        {
            CloseForm();
        }
      
        private void FrmQL_LopHC_KeyDown(object sender, KeyEventArgs e)
        {
            if(e.KeyCode == Keys.Escape)
            {
                CloseForm();
            }
        }

        private void groupBox2_Enter(object sender, EventArgs e)
        {

        }
    }
}
