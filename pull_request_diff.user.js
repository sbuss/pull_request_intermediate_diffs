// ==UserScript==
// @name          Pull Request Diffs
// @namespace     http://github.com/sbuss/
// @description	  An easy way to view intermediate diffs in a pull request.
// @include       http://github*/*/*/pull/*
// @include       https://github*/*/*/pull/*
// @include       http://*.github*/*/*/pull/*
// @include       https://*.github*/*/*/pull/*
// ==/UserScript==


function main() {
    placeRadioButtons();

    function placeRadioButtons() {
        var commits = $('td.commit')
        for (var i = 0; i < commits.length; i++) {
            anchor = commits[i].getElementsByTagName("a")[0]

            var radio1 = document.createElement("input")
            radio1.type = "radio"
            radio1.name = "start_compare"
            radio1.value = anchor.innerHTML

            var radio2 = document.createElement("input")
            radio2.type = "radio"
            radio2.name = "end_compare"
            radio2.value = anchor.innerHTML

            c = commits[i]
            c.insertBefore(radio2, commits[i].childNodes[1])
            c.insertBefore(radio1, commits[i].childNodes[1])
        }

        if (commits.length > 0) {
            div = document.createElement("div")
            div.style.position = "fixed"
            div.style.top = "0"
            div.style.left = "0"
            div.style.display = "block"
            div.style.zIndex = "1000"
            div.style.padding = "5px"
            div.style.background = "#fff"
            div.style.border = "solid 1px #000"
            compare_link = document.createElement("a")
            compare_link.href = "javascript:compare()"
            compare_link.innerHTML = "Compare selected commits"
            div.appendChild(compare_link)
            document.getElementsByTagName('body')[0].appendChild(div)
        }
    }

    function getSelectedRadio(group) {
        if (group[0]) {
            for (var i = 0; i < group.length; i++) {
                if (group[i].checked) {
                    return group[i]
                }
            }
        } else {
            if (group.checked) {
                return group
            }
        }
        return null
    }

    window.compare = function() {
        radio1 = getSelectedRadio(document.getElementsByName("start_compare"))
        radio2 = getSelectedRadio(document.getElementsByName("end_compare"))
        // Pull request urls are like /user/repo/pull/<id>
        path = window.location.pathname.split('/').slice(0,3).join("/")
        if (radio1 != null && radio2 != null) {
            window.location = path + "/compare/" + radio1.value + "..." + radio2.value
        }
    }
}

// So the compare function can be referenced in chrome
var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + main + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);

