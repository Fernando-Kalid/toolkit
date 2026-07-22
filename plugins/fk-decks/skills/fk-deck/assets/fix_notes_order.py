#!/usr/bin/env python3
# Move <p:notesMasterIdLst> to schema-correct position (after </p:sldMasterIdLst>).
import sys, re, zipfile, shutil, os
def fix(path):
    tmp = path + ".tmp"
    with zipfile.ZipFile(path, "r") as zin:
        items = [(i, zin.read(i.filename)) for i in zin.infolist()]
    out, changed = [], False
    for info, data in items:
        if info.filename == "ppt/presentation.xml":
            xml = data.decode("utf-8")
            m = re.search(r"<p:notesMasterIdLst>.*?</p:notesMasterIdLst>", xml, re.S)
            if m and "</p:sldMasterIdLst>" in xml:
                blk = m.group(0)
                x2 = (xml[:m.start()] + xml[m.end():]).replace(
                    "</p:sldMasterIdLst>", "</p:sldMasterIdLst>" + blk, 1)
                if x2 != xml:
                    data = x2.encode("utf-8"); changed = True
        out.append((info, data))
    with zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
        for info, data in out:
            zout.writestr(info, data)
    shutil.move(tmp, path)
    print(f"{os.path.basename(path)}: {'reordered' if changed else 'no change'}")
for p in sys.argv[1:]:
    fix(p)
