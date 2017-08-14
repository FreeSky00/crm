// 格式化分配状态
function formatState(value) {
	if (value == null) {
		return "未知";
	}else if (value == 0) {
		return "未分配";
	} else {
		return "已分配";
	}
}

// 搜索
function searchSaleChance() {
	var data = {
			customerName: $("#s_customerName").val(),
			overview: $("#s_overview").val(),
			createMan: $("#s_createMan").val(),
			state:$("#s_state").combobox('getValue')
	}
	$("#dg").datagrid('load', data);
}

// 弹出框弹出
function openSaleChanceAddDialog() {
	$("#dlg").dialog('open').dialog('setTitle', "添加营销机会");
}

// 弹出修改窗体
function openSaleChanceModifyDialog() {
	// 获取选中的行
	var rows = $('#dg').datagrid('getSelections');
	if (rows.length != 1) {
		$.messager.alert("系统提示", "请选择一行进行修改");
		return;
	}
	// 给form表单赋值
	var row = rows[0];
	$("#fm").form('load', row);
	$("#dlg").dialog('open').dialog('setTitle', '修改')
}

// 保存
function saveSaleChance() {
    var customerName = $('#customerId').combobox('getText');
    if (isEmpty(customerName)) {
    	$.messager.alert("系统提示","请选择客户名称！");
    }
    $("#customerName").val(customerName);
    $("#fm").form("submit",{
        url: 'add', // 相对路径
        onSubmit: function() {
            return $(this).form("validate");
        },
        success:function(result) {
            result = JSON.parse(result);
            if(result.resultCode == 1) {
                $.messager.alert("系统提示", "保存成功！");
                resetValue(); // 置空
                $("#dlg").dialog("close");
                $("#dg").datagrid("reload");
            }else{
                $.messager.alert("系统提示","保存失败！");
                return;
            }
        }
    });
}

// 删除

function deleteSaleChance() {
	var ids=[];
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length==0){
		$.messager.alert("提示", "请选择行进行删除");
		return;
	}
	for(var i=0;i<selectedRows.length;i++){
		var row=selectedRows[i];
		ids.push(row.id);
	}
	$.messager.confirm('确认','您确认想要这<span style="color:read">'+selectedRows.length+'</span>条删除记录吗？',function(r){    
	    if (r){    
	          $.post('delete',{ids:ids.join(',')},function(resp){
	        	  if(resp.resultCode==0){
	        		  $.messager.alert("提示", resp.resultMessage);
	        	  }else{
	        		  $.messager.alert("提示", resp.result);
	        		  $("#dg").datagrid('reload');
	        	  }
	          }) ;
	    }    
	});
}

// 重置
function resetValue(){
	$("#fm").form("reset");
}

// 关闭弹出框
function closeSaleChanceDialog() {
	// 置空
	resetValue();
	$("#dlg").dialog('close');

}
