# 面向对象的方式实现 Tab 组件
## 组件功能
- tab分解选中变色并展示对应内容.并且直接通过调用Tab选中对应标签实现方法,保证了js代码复用
## 组件实现
- 创建一个Tab初始化
- 调用init选择元素放入.prototype这个公共容器中
- 调用bind绑定事件放入.prototype这个公共容器中
## 如何使用
- 使用选择器document.querySelectorAll选择相应的元素下标
- new Tab new一个实例出来执行Tab