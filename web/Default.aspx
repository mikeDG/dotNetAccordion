<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="Sample._Default" %>
<!DOCTYPE html>
<html>
<head runat="server">
    <title>dotNetAccordion</title>
    <style type="text/css">
    Body, Div 
    {
        font-family:Sans-Serif;
    }    
        
    .dotNetAccordionHead
    {
        overflow:hidden;
        clear:both
    }
    .dotNetAccordionHead h3
    {
        line-height:40px;
        margin:0;
    }
    .dotNetAccordionHead .ExpandSwitch
    {
        display:block;
        float:left;
        text-decoration:none;
        font-size:30px;
        font-weight:bold;
        width:20px;
        text-align:center;
        line-height:40px;
        margin:0 5px 0 0;
    }
    </style>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js" type="text/javascript"></script>
    <script src="jquery.dotNetAccordion.js" type="text/javascript"></script>
    <script type="text/javascript">
        // call jQuery plugin
        jQuery(document).ready(function ($) {
            $('.dotNetAccordionHead .ExpandSwitch').dotNetAccordion({
                stateFieldID: '<%=dotNetAccordionsState.ClientID %>'
            });
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">

        <%-- Need this hidden field to maintain state across postbacks --%>
        <asp:HiddenField ID="dotNetAccordionsState" runat="server" />

        <p align="center">
            <asp:Button runat="server" Text="Test Postbacks!" />
        </p>

        <div class="dotNetAccordionHead">
            <%-- href as internal link --%>
            <a title="collapse" class="ExpandSwitch HideOther" href="#AccordionBody1">-</a>
            <h3> Panel 1 </h3>
        </div>
        <div id="AccordionBody1">
            <p>
                Panel 1 body <br />
                Panel 1 body 
            </p>
        </div>

        <asp:Repeater ID="Repeater1" runat="server">
        <ItemTemplate>
                <div class="dotNetAccordionHead">
                    <%-- if Panels is inside Repeater/GridView, then use runat server to get .Net generating different IDs --%>
                    <%-- if Panel runat server then use .ClientID --%>
                    <a title="collapse" class="ExpandSwitch HideOther" id="SwitchLink" runat="server" 
                        href='<%# "#"+ Container.FindControl("AccordionBody").ClientID %>'>-</a>
                    
                    <h3> <%#Container.DataItem%> </h3>
                </div>
                <div id="AccordionBody" runat="server">
                    <p>
                        <%#Container.DataItem%> body <br />
                        <%#Container.DataItem%> body 
                    </p>
                </div>
        </ItemTemplate>
        </asp:Repeater>

    </form>
</body>
</html>
