namespace Ứng_dụng_thi_trực_tuyến_khoa_CNTT
{
    partial class FrmMain
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(FrmMain));
            this.lblUs = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.lbRoName = new System.Windows.Forms.Label();
            this.btnDX = new System.Windows.Forms.Button();
            this.btnDMK = new System.Windows.Forms.Button();
            this.btnADDUS = new System.Windows.Forms.Button();
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.quảnLýToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.lớpHànhChínhToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.lớpHọcPhầnToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.menuStrip1.SuspendLayout();
            this.SuspendLayout();
            // 
            // lblUs
            // 
            this.lblUs.Dock = System.Windows.Forms.DockStyle.Left;
            this.lblUs.Location = new System.Drawing.Point(0, 28);
            this.lblUs.Name = "lblUs";
            this.lblUs.Size = new System.Drawing.Size(200, 925);
            this.lblUs.TabIndex = 4;
            this.lblUs.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label2
            // 
            this.label2.Image = ((System.Drawing.Image)(resources.GetObject("label2.Image")));
            this.label2.Location = new System.Drawing.Point(43, 53);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(100, 100);
            this.label2.TabIndex = 17;
            // 
            // lbRoName
            // 
            this.lbRoName.Location = new System.Drawing.Point(0, 180);
            this.lbRoName.Name = "lbRoName";
            this.lbRoName.Size = new System.Drawing.Size(200, 27);
            this.lbRoName.TabIndex = 18;
            this.lbRoName.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // btnDX
            // 
            this.btnDX.Image = ((System.Drawing.Image)(resources.GetObject("btnDX.Image")));
            this.btnDX.Location = new System.Drawing.Point(0, 573);
            this.btnDX.Name = "btnDX";
            this.btnDX.Size = new System.Drawing.Size(200, 45);
            this.btnDX.TabIndex = 21;
            this.btnDX.Text = "Đăng xuất";
            this.btnDX.TextImageRelation = System.Windows.Forms.TextImageRelation.ImageBeforeText;
            this.btnDX.UseVisualStyleBackColor = true;
            // 
            // btnDMK
            // 
            this.btnDMK.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(128)))), ((int)(((byte)(255)))), ((int)(((byte)(128)))));
            this.btnDMK.Image = ((System.Drawing.Image)(resources.GetObject("btnDMK.Image")));
            this.btnDMK.Location = new System.Drawing.Point(0, 405);
            this.btnDMK.Name = "btnDMK";
            this.btnDMK.Size = new System.Drawing.Size(200, 45);
            this.btnDMK.TabIndex = 20;
            this.btnDMK.Text = "Đổi mật khẩu";
            this.btnDMK.TextImageRelation = System.Windows.Forms.TextImageRelation.ImageBeforeText;
            this.btnDMK.UseVisualStyleBackColor = false;
            // 
            // btnADDUS
            // 
            this.btnADDUS.BackColor = System.Drawing.Color.Cyan;
            this.btnADDUS.Image = ((System.Drawing.Image)(resources.GetObject("btnADDUS.Image")));
            this.btnADDUS.Location = new System.Drawing.Point(0, 309);
            this.btnADDUS.Name = "btnADDUS";
            this.btnADDUS.Size = new System.Drawing.Size(200, 45);
            this.btnADDUS.TabIndex = 19;
            this.btnADDUS.Text = "Tạo tài khoản mới";
            this.btnADDUS.TextImageRelation = System.Windows.Forms.TextImageRelation.ImageBeforeText;
            this.btnADDUS.UseVisualStyleBackColor = false;
            // 
            // menuStrip1
            // 
            this.menuStrip1.ImageScalingSize = new System.Drawing.Size(20, 20);
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.quảnLýToolStripMenuItem});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(1182, 28);
            this.menuStrip1.TabIndex = 22;
            this.menuStrip1.Text = "menuStrip1";
            // 
            // quảnLýToolStripMenuItem
            // 
            this.quảnLýToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.lớpHànhChínhToolStripMenuItem,
            this.lớpHọcPhầnToolStripMenuItem});
            this.quảnLýToolStripMenuItem.Name = "quảnLýToolStripMenuItem";
            this.quảnLýToolStripMenuItem.Size = new System.Drawing.Size(73, 24);
            this.quảnLýToolStripMenuItem.Text = "Quản lý";
            // 
            // lớpHànhChínhToolStripMenuItem
            // 
            this.lớpHànhChínhToolStripMenuItem.Name = "lớpHànhChínhToolStripMenuItem";
            this.lớpHànhChínhToolStripMenuItem.Size = new System.Drawing.Size(224, 26);
            this.lớpHànhChínhToolStripMenuItem.Text = "Lớp hành chính";
            this.lớpHànhChínhToolStripMenuItem.Click += new System.EventHandler(this.lớpHànhChínhToolStripMenuItem_Click);
            // 
            // lớpHọcPhầnToolStripMenuItem
            // 
            this.lớpHọcPhầnToolStripMenuItem.Name = "lớpHọcPhầnToolStripMenuItem";
            this.lớpHọcPhầnToolStripMenuItem.Size = new System.Drawing.Size(224, 26);
            this.lớpHọcPhầnToolStripMenuItem.Text = "Lớp học phần";
            this.lớpHọcPhầnToolStripMenuItem.Click += new System.EventHandler(this.lớpHọcPhầnToolStripMenuItem_Click);
            // 
            // FrmMain
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(9F, 19F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1182, 953);
            this.Controls.Add(this.btnDX);
            this.Controls.Add(this.btnDMK);
            this.Controls.Add(this.btnADDUS);
            this.Controls.Add(this.lbRoName);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.lblUs);
            this.Controls.Add(this.menuStrip1);
            this.Font = new System.Drawing.Font("Times New Roman", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.IsMdiContainer = true;
            this.Margin = new System.Windows.Forms.Padding(5, 5, 5, 5);
            this.Name = "FrmMain";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Home";
            this.Load += new System.EventHandler(this.FrmMain_Load);
            this.SizeChanged += new System.EventHandler(this.FrmMain_SizeChanged);
            this.KeyDown += new System.Windows.Forms.KeyEventHandler(this.FrmMain_KeyDown);
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }
        #endregion

        private System.Windows.Forms.Label lblUs;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label lbRoName;
        private System.Windows.Forms.Button btnDX;
        private System.Windows.Forms.Button btnDMK;
        private System.Windows.Forms.Button btnADDUS;
        private System.Windows.Forms.MenuStrip menuStrip1;
        private System.Windows.Forms.ToolStripMenuItem quảnLýToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem lớpHànhChínhToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem lớpHọcPhầnToolStripMenuItem;
    }
}



