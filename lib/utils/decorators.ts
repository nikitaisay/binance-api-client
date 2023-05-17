export function validateRequiredParams(paramObject: string[]) {
  return function (_target: any, _key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (args: any) {
      paramObject.forEach((param) => {
        if (!Object.keys(args).includes(param)) {
          throw new Error(`Missing required parameter: ${param}`);
        }
      });

      return originalMethod.apply(this, [args]);
    };

    return descriptor;
  };
}
