/**
 * декоратор конструкции try catch, для асинхронных действий
 * @param {function} handler обработчик ошибки
 */
export default function tryCatch(handler) {
	/**
	 * @param {object} target объект для декора
	 * @param {string} propertyKey имя св-ва
	 * @param {property} propertyDescriptor определение св-ва
	 */
	return (target, propertyKey, propertyDescriptor) => {
		const originalMethod = propertyDescriptor.value
		const $propertyDescriptor = propertyDescriptor
		if (originalMethod) {
			// console.log(originalMethod)
			// const isAsync = originalMethod.constructor.name === "AsyncFunction"
			// console.log(isAsync)
			$propertyDescriptor.value = async function setDesc(arg) {
				try {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
       args[_key] = arguments[_key]
     }
					return await originalMethod.apply(this, args)
				} catch (err) {
					// console.log(arg)
					// console.log(err)
					return handler(err)
				}
			}
		}
		return $propertyDescriptor
	}
}
