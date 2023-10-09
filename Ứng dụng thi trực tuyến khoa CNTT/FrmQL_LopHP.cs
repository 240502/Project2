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
    public partial class FrmQL_LopHP : Form
    {
        public FrmQL_LopHP()
        {
            InitializeComponent();
        }

        private void btnThoat_Click(object sender, EventArgs e)
        {

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
        private void btnThoat_Click_1(object sender, EventArgs e)
        {
               CloseForm();
        }

        private void FrmQL_LopHP_KeyDown(object sender, KeyEventArgs e)
        {
            if(e.KeyCode == Keys.Escape)
            {
               CloseForm();
            }
        }
    }
}
