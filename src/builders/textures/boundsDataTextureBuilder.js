import { DataTexture, RGBAFormat, FloatType } from "three";
import immediate from "immediate";


// Create a Data Texture holding the boundaries (x/y offset and w/h) that should be available to any given texel for any given text.

var BoundsDataTextureBuilder = (function () {

  function _boundsDataForMapping (mapping) {
    var texts = mapping.texts,
        data = new Float32Array(texts.length * 4);

    for (var i = 0; i < texts.length; i++) {
      var text = texts[i],
          bounds = mapping.boundsForText(text);

      data[4*i]   = bounds.x;                               // x
      data[4*i+1] = mapping.height - (bounds.y + bounds.h); // y
      data[4*i+2] = bounds.w;                               // w
      data[4*i+3] = bounds.h;                               // h
    }

    return data;
  }

  return {

    build : function (mapping, completion) {
      immediate(function() {
        var data = _boundsDataForMapping(mapping),
            texture = new DataTexture(data, mapping.texts.length, 1, RGBAFormat, FloatType);

        texture.needsUpdate = true;

        completion(texture);
      });
    }
  };
})();


export { BoundsDataTextureBuilder };
