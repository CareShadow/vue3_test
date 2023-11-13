const requireAll = requireContext => requireContext.keys().map(requireContext)
// 将所有的svg文件import进入
const req = require.context('.', false, /\.svg$/)
requireAll(req)
