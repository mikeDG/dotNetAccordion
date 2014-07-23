using System;
using System.Collections.Generic;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

namespace Sample
{
    public partial class _Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                var SampleList = new List<string>();
                SampleList.Add("Panel 2");
                SampleList.Add("Panel 3");

                Repeater1.DataSource = SampleList;
                Repeater1.DataBind();
            }
        }
       
    }
}