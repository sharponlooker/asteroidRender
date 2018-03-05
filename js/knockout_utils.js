ko.extenders.numeric = function (target, precision) {
	var result = ko.pureComputed({
		read: target,  //always return the original observables value
		write: function (newValue) {
			var current = target(),
                roundingMultiplier = Math.pow(10, precision),
                newValueAsNum = isNaN(newValue) ? 0 : +newValue,
                valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;

			//only write if it changed
			if (valueToWrite !== current) {
				target(valueToWrite);
			} else {
				//if the rounded value is the same, but a different value was written, force a notification for the current field
				if (newValue !== current) {
					target.notifySubscribers(valueToWrite);
				}
			}
		}
	}).extend({ notify: 'always' });

	result(target());

	return result;
};