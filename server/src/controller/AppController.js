function userList(req, res) {
  console.log('sysNoticeListPage body:', req.body)
  const { pageNum, pageSize } = req.body
  const totalSize = 32
  const count = pageNum * pageSize < totalSize ? pageSize : totalSize % pageSize

  let content = []
  for (let i = 0; i < count; i++) {
    content.push({
      id: i,
      createdBy: Math.random() > 0.5 ? 'admin' : 'system',
      title: '这是标题这是标题这是标题这是标题这是标题这是标题',
      createdTime: '2008-05-09 16:04:09',
      content: '这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容',
      publishTime: Math.random() > 0.5 ? '' : '2008-05-09 16:04:09',
    })
  }

  res.json({
    code: 200,
    data: {
      pageNum,
      pageSize,
      totalSize,
      content,
    },
  })
}

export { userList }
