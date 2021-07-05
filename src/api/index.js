import ajax from './ajax.js'

const BASE = "http://localhost:5000"


//登录
export const reLogin = (username,password) => ajax(BASE+'/login',{username,password},'POST')

//获取分类列表
export const reqCategory = (parentId)=>ajax(BASE+'/manage/category/list',{parentId})
//添加分类
export const reqAddCategory = (categoryName,parentId)=>ajax(BASE+'/manage/category/add',{categoryName,parentId},'POST')
//更新分类
export const reqUpdateCategory = ({categoryId,categoryName})=>ajax(BASE+'/manage/category/update',{categoryId,categoryName},'POST')

//根据id获取分类名称
export const reqCategoryName = (categoryId)=> ajax(BASE+'/manage/category/info',{categoryId})

//product
//获取商品分页列表
export const reqProducts = (pageNum,pageSize)=>ajax(BASE+'/manage/product/list',{pageNum,pageSize});

//搜索商品分页列表
export const reqSearchProducts = ({pageNum,pageSize,searchName,searchType})=>ajax(BASE+'/manage/product/search',{pageNum,pageSize,[searchType]:searchName});


//更新商品的状态 上架下架的操作
export const reqUpdateProduct = (productId,status)=>ajax(BASE+'/manage/product/updateStatus',{productId,status},'POST');

//添加用户
export const reAddUser = (user) => ajax(BASE+"/manage/user/add",user,'POST');



//
export const reqDeleteImg = (name)=>ajax(BASE+'/manage/img/delete',{name},'POST')

//获取角色列表
export const reqRoleList = () => ajax(BASE+'/manage/role/list');

//添加角色

export const reqAddRole = (name)=> ajax(BASE+'/manage/role/add',{name},'POST')


//更新角色状态
export const reqUpdateRole = (role) => ajax(BASE+'/manage/role/update',role,'POST')


//获取用户列表
export const reqUsers = ()=>ajax(BASE+'/manage/user/list')

//删除用户
export const reqDeleteUser = (_id)=>ajax(BASE+'/manage/user/delete',{_id},'POST')

//添加用户
export const reqAddOrUpdateUser = (user)=>ajax(BASE+'/manage/user/'+(user._id?'update':'add'),user,"POST")