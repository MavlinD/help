export default function before(handler) {
	/**
	 * @param {object} target объект для декора
	 * @param {string} propertyKey имя св-ва
	 * @param {property} propertyDescriptor определение св-ва
	 */
	return (target, propertyKey, propertyDescriptor) => {
		const originalMethod = propertyDescriptor.value
		const $propertyDescriptor = propertyDescriptor
		if (originalMethod) {
			// console.log(originalMethod instanceof Promise)
			// console.log(originalMethod)
			// const isAsync = originalMethod.constructor.name === "AsyncFunction"
			// console.log(isAsync)
			$propertyDescriptor.value = async function setDesc(arg) {
				handler(arg)
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key]
    }
				return await originalMethod.apply(this, args)
			}
		}
		return $propertyDescriptor
	}
}
